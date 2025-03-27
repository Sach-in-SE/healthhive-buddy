import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, Loader2, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  getAvailableSymptoms,
  getSymptomSeverities,
  analyzeSymptoms,
  SymptomateSymptom,
  SymptomateSeverity,
  SymptomateCondition
} from '@/services/symptomate-api';
import { getDietRecommendations, DietRecommendation } from '@/services/diet-recommendation';
import CompactDietRecommendation from '@/components/diet/CompactDietRecommendation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SelectedSymptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  severityId?: string;
}

const SymptomCheck: React.FC = () => {
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<SelectedSymptom[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<SymptomateCondition[] | null>(null);
  const [symptoms, setSymptoms] = useState<SymptomateSymptom[]>([]);
  const [severities, setSeverities] = useState<SymptomateSeverity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [triageLevel, setTriageLevel] = useState<'emergency' | 'consultation' | 'self_care' | null>(null);
  const [triageDescription, setTriageDescription] = useState<string | null>(null);
  const [dietRecommendations, setDietRecommendations] = useState<DietRecommendation[]>([]);
  
  const getLanguageForApi = (langCode: string) => {
    const languageMap: Record<string, string> = {
      'en': 'en-gb',
      'es': 'es-es',
      'hi': 'en-gb'
    };
    return languageMap[langCode] || 'en-gb';
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiLanguage = getLanguageForApi(currentLanguage);
        const [symptomsData, severitiesData] = await Promise.all([
          getAvailableSymptoms(apiLanguage),
          getSymptomSeverities(apiLanguage)
        ]);
        setSymptoms(symptomsData);
        setSeverities(severitiesData);
      } catch (error) {
        console.error('Error fetching symptom data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load symptom data. Please try again later.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [currentLanguage, toast]);

  const filteredSymptoms = symptoms.filter(
    symptom => 
      symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      !selectedSymptoms.some(selected => selected.id === symptom.id)
  );

  const handleAddSymptom = (symptom: SymptomateSymptom) => {
    const moderateSeverity = severities.find(sev => sev.name === 'moderate');
    setSelectedSymptoms([...selectedSymptoms, { 
      id: symptom.id, 
      name: symptom.name, 
      severity: 'moderate',
      severityId: moderateSeverity?.id
    }]);
    setSearchTerm('');
  };

  const handleRemoveSymptom = (id: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== id));
  };

  const handleChangeSeverity = (id: string, severity: 'mild' | 'moderate' | 'severe') => {
    const severityObj = severities.find(sev => sev.name === severity);
    setSelectedSymptoms(
      selectedSymptoms.map(s => 
        s.id === id ? { ...s, severity, severityId: severityObj?.id } : s
      )
    );
  };

  const handleAnalyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsAnalyzing(true);
    setResults(null);
    setDietRecommendations([]);
    
    try {
      const request = {
        sex: 'male' as const,
        age: 35,
        symptoms: selectedSymptoms.map(sym => ({
          id: sym.id,
          reported: 'present' as const,
          severity: sym.severityId
        })),
        region: 'US'
      };
      
      const apiLanguage = getLanguageForApi(currentLanguage);
      const response = await analyzeSymptoms(request, apiLanguage);
      
      setResults(response.conditions);
      setTriageLevel(response.triage?.level || null);
      setTriageDescription(response.triage?.description || null);
      
      if (response.conditions && response.conditions.length > 0) {
        const diets = getDietRecommendations(response.conditions);
        setDietRecommendations(diets);
      }
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      toast({
        title: 'Analysis Failed',
        description: 'Unable to analyze symptoms. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetCheck = () => {
    setSelectedSymptoms([]);
    setResults(null);
    setTriageLevel(null);
    setTriageDescription(null);
  };
  
  const getTriageBadgeColor = () => {
    switch (triageLevel) {
      case 'emergency':
        return 'bg-red-100 border-red-500 text-red-800';
      case 'consultation':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'self_care':
        return 'bg-green-100 border-green-500 text-green-800';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };
  
  const getTriageText = () => {
    switch (triageLevel) {
      case 'emergency':
        return 'Emergency Care Needed';
      case 'consultation':
        return 'Medical Consultation Advised';
      case 'self_care':
        return 'Self-Care Recommended';
      default:
        return 'Recommendation';
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <Loader2 size={40} className="animate-spin text-health-500" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {!results ? (
        <>
          <div className="glass-panel p-6 rounded-2xl mb-8">
            <h3 className="text-xl font-semibold mb-6">Select your symptoms</h3>
            
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for a symptom..."
                className="pl-10 w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-health-400 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {searchTerm && (
              <div className="mb-6 max-h-60 overflow-y-auto rounded-xl border border-gray-100">
                {filteredSymptoms.length > 0 ? (
                  filteredSymptoms.map(symptom => (
                    <div 
                      key={symptom.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between border-b border-gray-100 last:border-b-0"
                      onClick={() => handleAddSymptom(symptom)}
                    >
                      <span>{symptom.name}</span>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No symptoms found matching "{searchTerm}"
                  </div>
                )}
              </div>
            )}
            
            <div>
              <h4 className="font-medium mb-3 text-sm text-gray-600">Selected symptoms:</h4>
              {selectedSymptoms.length > 0 ? (
                <div className="space-y-3">
                  {selectedSymptoms.map(symptom => (
                    <div key={symptom.id} className="bg-gray-50 p-3 rounded-xl flex items-center justify-between">
                      <span className="font-medium">{symptom.name}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <button
                            className={`px-2 py-1 text-xs rounded ${symptom.severity === 'mild' ? 'bg-health-200 text-health-800' : 'bg-gray-100 text-gray-600'}`}
                            onClick={() => handleChangeSeverity(symptom.id, 'mild')}
                          >
                            Mild
                          </button>
                          <button
                            className={`px-2 py-1 text-xs rounded ${symptom.severity === 'moderate' ? 'bg-health-200 text-health-800' : 'bg-gray-100 text-gray-600'}`}
                            onClick={() => handleChangeSeverity(symptom.id, 'moderate')}
                          >
                            Moderate
                          </button>
                          <button
                            className={`px-2 py-1 text-xs rounded ${symptom.severity === 'severe' ? 'bg-health-200 text-health-800' : 'bg-gray-100 text-gray-600'}`}
                            onClick={() => handleChangeSeverity(symptom.id, 'severe')}
                          >
                            Severe
                          </button>
                        </div>
                        <button
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => handleRemoveSymptom(symptom.id)}
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-xl">
                  <p className="text-gray-500">No symptoms selected yet.</p>
                  <p className="text-sm text-gray-400">Use the search bar above to add symptoms.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              size="lg" 
              className="health-gradient hover:shadow-highlight transition-all"
              disabled={selectedSymptoms.length === 0 || isAnalyzing}
              onClick={handleAnalyzeSymptoms}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Symptoms'
              )}
            </Button>
          </div>
        </>
      ) : (
        <div className="animate-fade-in">
          <h3 className="text-2xl font-semibold mb-6">Possible Conditions</h3>
          
          {triageLevel && triageDescription && (
            <div className={`mb-6 p-4 rounded-lg border-l-4 ${getTriageBadgeColor()}`}>
              <div className="flex items-center mb-2">
                <span className="font-semibold">{getTriageText()}</span>
              </div>
              <p>{triageDescription}</p>
            </div>
          )}
          
          <div className="space-y-6 mb-12">
            {results.map((condition, index) => (
              <div key={index} className="glass-panel p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-semibold">{condition.commonName || condition.name}</h4>
                  <div className="glass-panel px-3 py-1 rounded-full text-sm font-medium">
                    {Math.round(condition.probability * 100)}% match
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{condition.description || 'No description available.'}</p>
                {condition.treatment && (
                  <div>
                    <h5 className="font-medium mb-2">Recommendations:</h5>
                    <p className="text-gray-600">{condition.treatment}</p>
                  </div>
                )}
                {condition.specialisation && condition.specialisation.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      Relevant specialists: {condition.specialisation.map(s => s.replace('-', ' ')).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {dietRecommendations.length > 0 && (
            <div className="mb-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="diet">
                  <AccordionTrigger className="flex items-center bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-t-lg">
                    <div className="flex items-center text-green-700">
                      <Utensils className="mr-2 h-5 w-5" />
                      <h3 className="text-xl font-semibold">Recommended Diet Plan</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-white rounded-b-lg p-4 border border-t-0 border-gray-200">
                    <p className="mb-4 text-gray-600">
                      Based on your symptoms, we recommend the following diet plan to help manage your condition.
                    </p>
                    <div className="space-y-4">
                      {dietRecommendations.map((diet, index) => (
                        <CompactDietRecommendation 
                          key={index} 
                          diet={diet} 
                          detectedConditions={results}
                          className="border border-gray-200"
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
          
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={resetCheck}
            >
              Start New Check
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              <strong>Important:</strong> This is not a medical diagnosis. Please consult with a healthcare professional for proper medical advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomCheck;
