
import { SymptomateCondition } from './symptomate-api';

// Medical conditions that might require specific diets
export interface MedicalCondition {
  id: string;
  name: string;
  description: string;
}

// Diet recommendation interface
export interface DietRecommendation {
  id: string;
  title: string;
  description: string;
  foods: {
    recommended: string[];
    avoid: string[];
  };
  mealPlan?: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
  conditions: string[]; // Associated medical conditions
}

// User health profile to store medical history
export interface UserHealthProfile {
  age?: number;
  sex?: 'male' | 'female';
  weight?: number;
  height?: number;
  conditions: string[]; // Known medical conditions
  allergies: string[];
  dietaryPreferences?: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian' | 'keto' | 'paleo';
}

// Mock database of medical conditions
const medicalConditions: MedicalCondition[] = [
  {
    id: 'cond_diabetes',
    name: 'Diabetes',
    description: 'A chronic condition affecting how your body processes blood sugar (glucose).'
  },
  {
    id: 'cond_hypertension',
    name: 'Hypertension',
    description: 'High blood pressure is a common condition that affects the body\'s arteries.'
  },
  {
    id: 'cond_gerd',
    name: 'GERD',
    description: 'Gastroesophageal reflux disease, a digestive disorder that affects the lower esophageal sphincter.'
  },
  {
    id: 'cond_migraine',
    name: 'Migraine',
    description: 'A neurological condition that causes recurring headaches, often with intense pain.'
  },
  {
    id: 'cond_ibs',
    name: 'IBS',
    description: 'Irritable bowel syndrome affects the large intestine causing cramping, abdominal pain, bloating, gas, diarrhea and constipation.'
  },
  {
    id: 'cond_arthritis',
    name: 'Arthritis',
    description: 'Inflammation of one or more joints, causing pain and stiffness that can worsen with age.'
  }
];

// Mock database of diet recommendations
const dietRecommendations: DietRecommendation[] = [
  {
    id: 'diet_diabetes',
    title: 'Diabetes-Friendly Diet',
    description: 'A balanced diet focused on controlling blood sugar levels with consistent carbohydrate intake and high fiber foods.',
    foods: {
      recommended: [
        'Non-starchy vegetables (spinach, broccoli, carrots)',
        'Whole grains (brown rice, quinoa, oats)',
        'Lean proteins (chicken, fish, tofu)',
        'Healthy fats (avocados, nuts, olive oil)',
        'Low-glycemic fruits (berries, apples, pears)'
      ],
      avoid: [
        'Sugary drinks and sodas',
        'Processed snack foods',
        'White bread, rice, and pasta',
        'Fried foods and saturated fats',
        'Candy, cookies, and desserts with added sugars'
      ]
    },
    mealPlan: {
      breakfast: ['Greek yogurt with berries and nuts', 'Vegetable omelet with whole-grain toast', 'Overnight oats with cinnamon and apple slices'],
      lunch: ['Grilled chicken salad with olive oil dressing', 'Lentil soup with a side of vegetables', 'Quinoa bowl with roasted vegetables and avocado'],
      dinner: ['Baked fish with roasted vegetables', 'Turkey chili with beans and vegetables', 'Stir-fried tofu with brown rice and vegetables'],
      snacks: ['Small apple with almond butter', 'Celery sticks with hummus', 'Small handful of nuts and seeds']
    },
    conditions: ['cond_diabetes']
  },
  {
    id: 'diet_hypertension',
    title: 'Heart-Healthy DASH Diet',
    description: 'The DASH (Dietary Approaches to Stop Hypertension) diet is designed to help treat or prevent high blood pressure.',
    foods: {
      recommended: [
        'Fruits and vegetables',
        'Whole grains',
        'Fat-free or low-fat dairy products',
        'Lean meats, poultry and fish',
        'Beans, nuts, and seeds'
      ],
      avoid: [
        'High-sodium foods',
        'Processed foods',
        'Full-fat dairy products',
        'Fatty meats',
        'Sugar-sweetened beverages'
      ]
    },
    mealPlan: {
      breakfast: ['Oatmeal with banana and a sprinkle of cinnamon', 'Whole grain toast with avocado and boiled egg', 'Smoothie with spinach, banana, and low-fat yogurt'],
      lunch: ['Grilled chicken wrap with plenty of vegetables', 'Quinoa salad with beans and vegetables', 'Lentil soup with whole grain bread'],
      dinner: ['Baked salmon with steamed vegetables', 'Stir-fry with lean protein and brown rice', 'Bean chili with small portion of brown rice'],
      snacks: ['Fresh fruit', 'Unsalted nuts', 'Yogurt with berries']
    },
    conditions: ['cond_hypertension']
  },
  {
    id: 'diet_migraine',
    title: 'Migraine Prevention Diet',
    description: 'A diet aimed at reducing frequency and severity of migraines by avoiding common trigger foods.',
    foods: {
      recommended: [
        'Fresh vegetables, especially leafy greens',
        'Fresh fruits, particularly non-citrus varieties',
        'Whole grains',
        'Lean proteins',
        'Adequate water intake'
      ],
      avoid: [
        'Aged cheeses',
        'Processed meats with nitrates',
        'Foods with MSG or artificial sweeteners',
        'Red wine and other alcoholic beverages',
        'Chocolate and caffeine (for some people)'
      ]
    },
    mealPlan: {
      breakfast: ['Steel-cut oats with fresh berries', 'Whole grain toast with fresh avocado', 'Spinach omelet with mushrooms'],
      lunch: ['Fresh salad with grilled chicken and olive oil dressing', 'Quinoa bowl with roasted vegetables', 'Vegetable soup with whole grain crackers'],
      dinner: ['Baked white fish with brown rice and steamed vegetables', 'Turkey burger with sweet potato wedges', 'Vegetable stir-fry with tofu'],
      snacks: ['Apple slices', 'Unsalted almonds', 'Carrot sticks with hummus']
    },
    conditions: ['cond_migraine']
  },
  {
    id: 'diet_gerd',
    title: 'GERD-Friendly Diet',
    description: 'A diet designed to minimize acid reflux symptoms by avoiding trigger foods and eating patterns.',
    foods: {
      recommended: [
        'Lean proteins (chicken, turkey, fish)',
        'Non-citrus fruits',
        'Vegetables (except tomatoes, onions, garlic)',
        'Whole grains',
        'Healthy fats in moderation'
      ],
      avoid: [
        'Spicy foods',
        'Citrus fruits and juices',
        'Tomato-based foods',
        'Fatty or fried foods',
        'Chocolate, coffee, and carbonated beverages'
      ]
    },
    mealPlan: {
      breakfast: ['Oatmeal with banana and honey', 'Whole grain toast with egg whites', 'Non-citrus fruit smoothie with almond milk'],
      lunch: ['Grilled chicken with steamed vegetables', 'Sandwich with lean turkey on whole grain bread', 'Quinoa salad with cucumber and herbs'],
      dinner: ['Baked fish with rice and steamed carrots', 'Turkey breast with sweet potato and green beans', 'Grilled chicken with couscous and zucchini'],
      snacks: ['Rice cakes with almond butter', 'Low-fat yogurt', 'Banana or melon slices']
    },
    conditions: ['cond_gerd']
  },
  {
    id: 'diet_ibs',
    title: 'Low FODMAP Diet for IBS',
    description: 'A diet low in fermentable carbohydrates that can trigger IBS symptoms.',
    foods: {
      recommended: [
        'Low FODMAP vegetables (bell peppers, carrots, cucumber)',
        'Low FODMAP fruits (blueberries, grapes, oranges)',
        'Lactose-free dairy',
        'Gluten-free grains',
        'Lean proteins'
      ],
      avoid: [
        'Onions and garlic',
        'Beans and lentils',
        'Wheat products',
        'High-lactose dairy products',
        'Certain fruits (apples, pears, watermelon)'
      ]
    },
    mealPlan: {
      breakfast: ['Gluten-free oats with lactose-free milk and blueberries', 'Scrambled eggs with spinach on gluten-free toast', 'Lactose-free yogurt with allowed fruits'],
      lunch: ['Grilled chicken salad with low FODMAP vegetables', 'Rice bowl with lean protein and permitted vegetables', 'Gluten-free sandwich with turkey and lettuce'],
      dinner: ['Grilled fish with rice and permitted vegetables', 'Stir-fry with chicken and low FODMAP vegetables', 'Gluten-free pasta with olive oil and herbs'],
      snacks: ['Rice cakes with peanut butter', 'Small serving of allowed nuts', 'Orange or mandarin']
    },
    conditions: ['cond_ibs']
  },
  {
    id: 'diet_arthritis',
    title: 'Anti-Inflammatory Diet for Arthritis',
    description: 'A diet rich in anti-inflammatory foods to help reduce arthritis symptoms and inflammation.',
    foods: {
      recommended: [
        'Fatty fish (salmon, mackerel, sardines)',
        'Colorful fruits and vegetables',
        'Nuts and seeds',
        'Olive oil',
        'Whole grains'
      ],
      avoid: [
        'Processed foods',
        'Red meat',
        'Foods high in added sugars',
        'Refined carbohydrates',
        'Excessive alcohol'
      ]
    },
    mealPlan: {
      breakfast: ['Greek yogurt with berries and walnuts', 'Smoothie with spinach, pineapple, and turmeric', 'Oatmeal with berries and ground flaxseed'],
      lunch: ['Quinoa salad with colorful vegetables', 'Grilled salmon with sweet potato', 'Mediterranean wrap with hummus and vegetables'],
      dinner: ['Baked fish with roasted vegetables', 'Stir-fry with tofu and colorful vegetables', 'Turkey chili with beans and vegetables'],
      snacks: ['Mixed nuts', 'Apple with almond butter', 'Carrot sticks with hummus']
    },
    conditions: ['cond_arthritis']
  },
  {
    id: 'diet_general',
    title: 'Balanced Healthy Diet',
    description: 'A general balanced diet suitable for most people, focusing on whole foods and nutritional balance.',
    foods: {
      recommended: [
        'Wide variety of fruits and vegetables',
        'Whole grains',
        'Lean proteins',
        'Healthy fats',
        'Low-fat dairy or alternatives'
      ],
      avoid: [
        'Processed foods high in salt and sugar',
        'Excessive saturated and trans fats',
        'Sugary beverages',
        'Excessive alcohol',
        'Highly processed meats'
      ]
    },
    mealPlan: {
      breakfast: ['Whole grain cereal with fruit and milk', 'Whole grain toast with avocado and egg', 'Yogurt parfait with granola and fruit'],
      lunch: ['Sandwich with lean protein and vegetables on whole grain bread', 'Grain bowl with roasted vegetables and protein', 'Mixed salad with protein and olive oil dressing'],
      dinner: ['Lean protein with roasted vegetables and whole grain side', 'Stir-fry with lean protein and mixed vegetables', 'One-pot grain and vegetable dish with protein'],
      snacks: ['Fresh fruit', 'Handful of nuts', 'Vegetable sticks with dip']
    },
    conditions: [] // General diet for no specific conditions
  }
];

// Default user health profile
const defaultUserProfile: UserHealthProfile = {
  conditions: [],
  allergies: []
};

// Get recommendations based on detected conditions and user health profile
export const getDietRecommendations = (
  detectedConditions: SymptomateCondition[] = [],
  userProfile: UserHealthProfile = defaultUserProfile
): DietRecommendation[] => {
  // Extract condition names from detected conditions
  const detectedConditionNames = detectedConditions.map(condition => condition.name.toLowerCase());
  
  // Map conditions to our known condition IDs
  const relevantConditionIds: string[] = [];
  
  // Check for matches between detected conditions and our known conditions
  medicalConditions.forEach(condition => {
    if (detectedConditionNames.some(detectedName => 
      detectedName.includes(condition.name.toLowerCase()) || 
      condition.name.toLowerCase().includes(detectedName)
    )) {
      relevantConditionIds.push(condition.id);
    }
  });
  
  // Add user's existing conditions
  const allConditionIds = [...new Set([...relevantConditionIds, ...userProfile.conditions])];
  
  // If no conditions are found, return the general diet
  if (allConditionIds.length === 0) {
    return [dietRecommendations.find(diet => diet.id === 'diet_general')!];
  }
  
  // Find matching diets for the conditions
  const matchingDiets = dietRecommendations.filter(diet => 
    diet.conditions.some(condId => allConditionIds.includes(condId))
  );
  
  // If no matching diets, return the general diet
  if (matchingDiets.length === 0) {
    return [dietRecommendations.find(diet => diet.id === 'diet_general')!];
  }
  
  return matchingDiets;
};

// Create a health profile with user medical history
export const createUserHealthProfile = (
  conditions: string[] = [],
  allergies: string[] = [],
  age?: number,
  sex?: 'male' | 'female',
  dietaryPreferences?: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian' | 'keto' | 'paleo'
): UserHealthProfile => {
  return {
    age,
    sex,
    conditions,
    allergies,
    dietaryPreferences
  };
};

// Get all available medical conditions (for UI purposes)
export const getAllMedicalConditions = (): MedicalCondition[] => {
  return medicalConditions;
};

// Get specific diet recommendation by ID
export const getDietById = (dietId: string): DietRecommendation | undefined => {
  return dietRecommendations.find(diet => diet.id === dietId);
};

// Get condition by ID
export const getConditionById = (conditionId: string): MedicalCondition | undefined => {
  return medicalConditions.find(condition => condition.id === conditionId);
};
