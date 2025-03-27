
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { DietRecommendation, UserHealthProfile, getAllMedicalConditions, createUserHealthProfile, getDietRecommendations } from '@/services/diet-recommendation';
import { SymptomateCondition } from '@/services/symptomate-api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, Utensils, AlertTriangle } from 'lucide-react';

interface DietRecommendationsProps {
  detectedConditions?: SymptomateCondition[];
  className?: string;
  compact?: boolean;
}

const DietRecommendations: React.FC<DietRecommendationsProps> = ({ 
  detectedConditions = [], 
  className = '',
  compact = false
}) => {
  const [recommendations, setRecommendations] = useState<DietRecommendation[]>([]);
  const [userProfile, setUserProfile] = useState<UserHealthProfile>(() => 
    createUserHealthProfile()
  );
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const { translate, currentLanguage } = useLanguage();
  
  // All available medical conditions
  const allConditions = getAllMedicalConditions();
  
  // Update recommendations when conditions change
  useEffect(() => {
    const newProfile = createUserHealthProfile(selectedConditions);
    setUserProfile(newProfile);
    const diets = getDietRecommendations(detectedConditions, newProfile);
    setRecommendations(diets);
  }, [detectedConditions, selectedConditions]);
  
  // Handle condition selection change
  const handleConditionChange = (conditionId: string, checked: boolean) => {
    if (checked) {
      setSelectedConditions(prev => [...prev, conditionId]);
    } else {
      setSelectedConditions(prev => prev.filter(id => id !== conditionId));
    }
  };
  
  // Translations
  const [titles, setTitles] = useState({
    pageTitle: 'Diet Recommendations',
    subTitle: 'Get personalized diet suggestions based on your health profile and symptoms',
    profileTitle: 'Your Health Profile',
    profileDescription: 'Select any medical conditions you have',
    updateButton: 'Update Recommendations',
    medicalHistory: 'Medical History',
    dietPlans: 'Diet Plans',
    foodsToEat: 'Foods to Eat',
    foodsToAvoid: 'Foods to Avoid',
    sampleMeals: 'Sample Meal Plan',
    breakfast: 'Breakfast',
    lunch: 'Lunch', 
    dinner: 'Dinner',
    snacks: 'Snacks',
    disclaimer: 'Disclaimer',
    disclaimerText: 'These diet recommendations are general guidelines. Please consult with a healthcare provider or registered dietitian before making significant changes to your diet.'
  });
  
  // Update translations when language changes
  useEffect(() => {
    const updateTranslations = async () => {
      const translated = {
        pageTitle: await translate('Diet Recommendations'),
        subTitle: await translate('Get personalized diet suggestions based on your health profile and symptoms'),
        profileTitle: await translate('Your Health Profile'),
        profileDescription: await translate('Select any medical conditions you have'),
        updateButton: await translate('Update Recommendations'),
        medicalHistory: await translate('Medical History'),
        dietPlans: await translate('Diet Plans'),
        foodsToEat: await translate('Foods to Eat'),
        foodsToAvoid: await translate('Foods to Avoid'),
        sampleMeals: await translate('Sample Meal Plan'),
        breakfast: await translate('Breakfast'),
        lunch: await translate('Lunch'),
        dinner: await translate('Dinner'),
        snacks: await translate('Snacks'),
        disclaimer: await translate('Disclaimer'),
        disclaimerText: await translate('These diet recommendations are general guidelines. Please consult with a healthcare provider or registered dietitian before making significant changes to your diet.')
      };
      setTitles(translated);
    };
    
    updateTranslations();
  }, [currentLanguage, translate]);
  
  return (
    <div className={`diet-recommendations ${className}`}>
      {!compact && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{titles.pageTitle}</h2>
          <p className="text-gray-600">{titles.subTitle}</p>
        </div>
      )}
      
      {!compact && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{titles.profileTitle}</CardTitle>
            <CardDescription>{titles.profileDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {allConditions.map(condition => (
                <div key={condition.id} className="flex items-start space-x-2">
                  <Checkbox 
                    id={`condition-${condition.id}`}
                    checked={selectedConditions.includes(condition.id)}
                    onCheckedChange={(checked) => 
                      handleConditionChange(condition.id, checked === true)
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label 
                      htmlFor={`condition-${condition.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {condition.name}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {recommendations.length > 0 ? (
        <Tabs defaultValue={recommendations[0].id} className="w-full">
          <TabsList className="mb-4 w-full flex overflow-x-auto">
            {recommendations.map(diet => (
              <TabsTrigger 
                key={diet.id} 
                value={diet.id}
                className="flex-shrink-0"
              >
                {diet.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {recommendations.map(diet => (
            <TabsContent key={diet.id} value={diet.id} className="border rounded-lg p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{diet.title}</h3>
                <p className="text-gray-600">{diet.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader className="bg-green-50">
                    <CardTitle className="flex items-center text-green-700">
                      <Utensils className="mr-2 h-5 w-5" />
                      {titles.foodsToEat}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="list-disc pl-5 space-y-1">
                      {diet.foods.recommended.map((food, index) => (
                        <li key={index}>{food}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="bg-red-50">
                    <CardTitle className="flex items-center text-red-700">
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      {titles.foodsToAvoid}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="list-disc pl-5 space-y-1">
                      {diet.foods.avoid.map((food, index) => (
                        <li key={index}>{food}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              {diet.mealPlan && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>{titles.sampleMeals}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{titles.breakfast}</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {diet.mealPlan.breakfast.map((meal, index) => (
                            <li key={index}>{meal}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{titles.lunch}</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {diet.mealPlan.lunch.map((meal, index) => (
                            <li key={index}>{meal}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{titles.dinner}</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {diet.mealPlan.dinner.map((meal, index) => (
                            <li key={index}>{meal}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{titles.snacks}</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {diet.mealPlan.snacks.map((meal, index) => (
                            <li key={index}>{meal}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Alert variant="default" className="bg-amber-50 border-amber-200">
                <InfoIcon className="h-4 w-4 text-amber-600" />
                <AlertTitle>{titles.disclaimer}</AlertTitle>
                <AlertDescription>
                  {titles.disclaimerText}
                </AlertDescription>
              </Alert>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">No diet recommendations available. Please update your health profile.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DietRecommendations;
