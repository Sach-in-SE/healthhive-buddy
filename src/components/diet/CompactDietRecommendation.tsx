
import React from 'react';
import { DietRecommendation } from '@/services/diet-recommendation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import DietRecommendations from './DietRecommendations';
import { SymptomateCondition } from '@/services/symptomate-api';

interface CompactDietRecommendationProps {
  diet: DietRecommendation;
  detectedConditions?: SymptomateCondition[];
  className?: string;
}

const CompactDietRecommendation: React.FC<CompactDietRecommendationProps> = ({ 
  diet, 
  detectedConditions = [],
  className = '' 
}) => {
  const { translate } = useLanguage();
  
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
        <div className="flex items-center">
          <Utensils className="h-5 w-5 mr-2 text-green-600" />
          <CardTitle className="text-lg">{diet.title}</CardTitle>
        </div>
        <CardDescription>{diet.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="mb-4">
          <h4 className="font-medium text-sm text-green-700 mb-1">Foods to Include:</h4>
          <ul className="list-disc pl-5 text-sm space-y-0.5">
            {diet.foods.recommended.slice(0, 3).map((food, index) => (
              <li key={index}>{food}</li>
            ))}
            {diet.foods.recommended.length > 3 && <li>...</li>}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-sm text-red-700 mb-1">Foods to Avoid:</h4>
          <ul className="list-disc pl-5 text-sm space-y-0.5">
            {diet.foods.avoid.slice(0, 3).map((food, index) => (
              <li key={index}>{food}</li>
            ))}
            {diet.foods.avoid.length > 3 && <li>...</li>}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              View Complete Diet Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Diet Recommendations</DialogTitle>
              <DialogDescription>
                Personalized dietary advice based on your symptoms and health profile
              </DialogDescription>
            </DialogHeader>
            <DietRecommendations 
              detectedConditions={detectedConditions} 
              compact={true} 
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default CompactDietRecommendation;
