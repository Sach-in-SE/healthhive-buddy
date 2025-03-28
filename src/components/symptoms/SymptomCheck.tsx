
import React, { useState } from 'react';
import { Search, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Symptom {
  id: string;
  name: string;
}

interface SelectedSymptom extends Symptom {
  severity: 'mild' | 'moderate' | 'severe';
}

const MOCK_SYMPTOMS: Symptom[] = [
  { id: '1', name: 'Headache' },
  { id: '2', name: 'Fever' },
  { id: '3', name: 'Cough' },
  { id: '4', name: 'Sore throat' },
  { id: '5', name: 'Fatigue' },
  { id: '6', name: 'Shortness of breath' },
  { id: '7', name: 'Nausea' },
  { id: '8', name: 'Dizziness' },
  { id: '9', name: 'Joint pain' },
  { id: '10', name: 'Chest pain' },
];

const SymptomCheck: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<SelectedSymptom[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const filteredSymptoms = MOCK_SYMPTOMS.filter(
    symptom => 
      symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      !selectedSymptoms.some(selected => selected.id === symptom.id)
  );

  const handleAddSymptom = (symptom: Symptom) => {
    setSelectedSymptoms([...selectedSymptoms, { ...symptom, severity: 'moderate' }]);
    setSearchTerm('');
  };

  const handleRemoveSymptom = (id: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== id));
  };

  const handleChangeSeverity = (id: string, severity: 'mild' | 'moderate' | 'severe') => {
    setSelectedSymptoms(
      selectedSymptoms.map(s => 
        s.id === id ? { ...s, severity } : s
      )
    );
  };

  const handleAnalyzeSymptoms = () => {
    setIsAnalyzing(true);
    
    // Mock API call with a timeout
    setTimeout(() => {
      // Mock response data
      const mockResults = [
        { 
          condition: 'Common Cold', 
          probability: 0.85, 
          description: 'A viral infectious disease of the upper respiratory tract that primarily affects the nose and throat.',
          recommendations: [
            'Rest and hydration',
            'Over-the-counter pain relievers',
            'Decongestants if needed'
          ]
        },
        { 
          condition: 'Seasonal Allergies', 
          probability: 0.65,
          description: 'An allergic reaction to pollen from trees, grasses, or weeds, or to airborne mold spores.',
          recommendations: [
            'Antihistamines',
            'Avoid known allergens',
            'Nasal irrigation'
          ]
        },
        { 
          condition: 'Viral Sinusitis', 
          probability: 0.45,
          description: 'Inflammation of the sinuses, typically caused by a viral infection and often following a cold.',
          recommendations: [
            'Saline nasal sprays',
            'Warm compresses',
            'Adequate rest'
          ]
        }
      ];
      
      setResults(mockResults);
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetCheck = () => {
    setSelectedSymptoms([]);
    setResults(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {!results ? (
        <>
          <div className="glass-panel p-6 rounded-2xl mb-8">
            <h3 className="text-xl font-semibold mb-6">Select your symptoms</h3>
            
            {/* Search input */}
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
            
            {/* Search results */}
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
            
            {/* Selected symptoms */}
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
          <div className="space-y-6 mb-12">
            {results.map((result, index) => (
              <div key={index} className="glass-panel p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-semibold">{result.condition}</h4>
                  <div className="glass-panel px-3 py-1 rounded-full text-sm font-medium">
                    {Math.round(result.probability * 100)}% match
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{result.description}</p>
                <div>
                  <h5 className="font-medium mb-2">Recommendations:</h5>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {result.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
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
