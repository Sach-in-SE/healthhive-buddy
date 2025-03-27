
import axios from 'axios';

// Symptomate API configuration
const SYMPTOMATE_API_URL = 'https://api.symptomate.com/v1';
const API_KEY = 'YOUR_API_KEY'; // Replace with actual API key

// Types for Symptomate API
export interface SymptomateSymptom {
  id: string;
  name: string;
  commonName?: string;
  sexFilter?: 'male' | 'female' | 'both';
  categories?: string[];
}

export interface SymptomateSeverity {
  id: string;
  name: 'mild' | 'moderate' | 'severe';
}

export interface SymptomateCondition {
  id: string;
  name: string;
  commonName: string;
  probability: number;
  specialisation: string[];
  description?: string;
  medicalCondition?: string;
  treatment?: string;
  possibleSymptoms?: string[];
}

export interface SymptomateRequest {
  sex: 'male' | 'female';
  age: number;
  symptoms: Array<{
    id: string;
    reported: 'present';
    severity?: string;
  }>;
  region?: string;
}

export interface SymptomateResponse {
  conditions: SymptomateCondition[];
  triage?: {
    level: 'emergency' | 'consultation' | 'self_care';
    description: string;
  };
}

// Function to get available symptoms
export const getAvailableSymptoms = async (language = 'en-gb'): Promise<SymptomateSymptom[]> => {
  try {
    // Normally we would use the actual API, but for demonstration, we'll use mock data
    // In production, uncomment the API call and remove the mock data
    
    /*
    const response = await axios.get(`${SYMPTOMATE_API_URL}/symptoms`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Accept-Language': language
      }
    });
    return response.data;
    */
    
    // Mock data for symptoms
    return [
      { id: 'sym_1', name: 'Headache', commonName: 'Headache', sexFilter: 'both' },
      { id: 'sym_2', name: 'Fever', commonName: 'Fever', sexFilter: 'both' },
      { id: 'sym_3', name: 'Cough', commonName: 'Cough', sexFilter: 'both' },
      { id: 'sym_4', name: 'Sore throat', commonName: 'Sore throat', sexFilter: 'both' },
      { id: 'sym_5', name: 'Fatigue', commonName: 'Fatigue', sexFilter: 'both' },
      { id: 'sym_6', name: 'Shortness of breath', commonName: 'Dyspnea', sexFilter: 'both' },
      { id: 'sym_7', name: 'Nausea', commonName: 'Nausea', sexFilter: 'both' },
      { id: 'sym_8', name: 'Dizziness', commonName: 'Dizziness', sexFilter: 'both' },
      { id: 'sym_9', name: 'Joint pain', commonName: 'Arthralgia', sexFilter: 'both' },
      { id: 'sym_10', name: 'Chest pain', commonName: 'Chest pain', sexFilter: 'both' },
      { id: 'sym_11', name: 'Abdominal pain', commonName: 'Abdominal pain', sexFilter: 'both' },
      { id: 'sym_12', name: 'Rash', commonName: 'Skin rash', sexFilter: 'both' },
      { id: 'sym_13', name: 'Vomiting', commonName: 'Vomiting', sexFilter: 'both' },
      { id: 'sym_14', name: 'Diarrhea', commonName: 'Diarrhea', sexFilter: 'both' },
      { id: 'sym_15', name: 'Runny nose', commonName: 'Rhinorrhea', sexFilter: 'both' }
    ];
  } catch (error) {
    console.error('Error fetching symptoms:', error);
    throw new Error('Failed to fetch symptoms');
  }
};

// Function to get symptom severities
export const getSymptomSeverities = async (language = 'en-gb'): Promise<SymptomateSeverity[]> => {
  try {
    /*
    const response = await axios.get(`${SYMPTOMATE_API_URL}/severities`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Accept-Language': language
      }
    });
    return response.data;
    */
    
    // Mock data for severities
    return [
      { id: 'sev_1', name: 'mild' },
      { id: 'sev_2', name: 'moderate' },
      { id: 'sev_3', name: 'severe' }
    ];
  } catch (error) {
    console.error('Error fetching severities:', error);
    throw new Error('Failed to fetch symptom severities');
  }
};

// Function to analyze symptoms
export const analyzeSymptoms = async (
  data: SymptomateRequest,
  language = 'en-gb'
): Promise<SymptomateResponse> => {
  try {
    /*
    const response = await axios.post(`${SYMPTOMATE_API_URL}/diagnosis`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Accept-Language': language
      }
    });
    return response.data;
    */
    
    // Mock response for demonstration (simulating API behavior)
    // This would normally come from the actual API
    const mockResponses: Record<string, SymptomateResponse> = {
      // Headache-related conditions
      'sym_1': {
        conditions: [
          {
            id: 'cond_1',
            name: 'Tension headache',
            commonName: 'Tension headache',
            probability: 0.85,
            specialisation: ['general-practice', 'neurology'],
            description: 'A tension headache is generally a diffuse, mild to moderate pain that's often described as feeling like a tight band around your head.',
            treatment: 'Over-the-counter pain relievers, stress management, adequate hydration, and proper rest.'
          },
          {
            id: 'cond_2',
            name: 'Migraine',
            commonName: 'Migraine',
            probability: 0.65,
            specialisation: ['neurology'],
            description: 'A migraine is a primary headache disorder characterized by recurrent headaches that are moderate to severe.',
            treatment: 'Rest in a quiet, dark room, cold compresses, and prescription medications if necessary.'
          },
          {
            id: 'cond_3',
            name: 'Sinusitis',
            commonName: 'Sinus infection',
            probability: 0.45,
            specialisation: ['otorhinolaryngology'],
            description: 'Sinusitis is an inflammation or swelling of the tissue lining the sinuses.',
            treatment: 'Nasal decongestants, nasal irrigation, warm compresses, and antibiotics if bacterial.'
          }
        ],
        triage: {
          level: 'self_care',
          description: 'Your symptoms suggest a condition that can be managed with self-care measures. However, if symptoms persist or worsen, consult a healthcare provider.'
        }
      },
      
      // Fever-related conditions
      'sym_2': {
        conditions: [
          {
            id: 'cond_4',
            name: 'Viral infection',
            commonName: 'Common cold',
            probability: 0.75,
            specialisation: ['general-practice', 'infectious-disease'],
            description: 'A viral infection affecting the upper respiratory tract, primarily the nose and throat.',
            treatment: 'Rest, hydration, over-the-counter fever reducers, and decongestants if needed.'
          },
          {
            id: 'cond_5',
            name: 'Influenza',
            commonName: 'Flu',
            probability: 0.60,
            specialisation: ['infectious-disease'],
            description: 'Influenza is a viral infection that attacks your respiratory system — your nose, throat, and lungs.',
            treatment: 'Rest, hydration, antiviral medications if caught early, and over-the-counter fever reducers.'
          },
          {
            id: 'cond_6',
            name: 'Bacterial infection',
            commonName: 'Bacterial infection',
            probability: 0.40,
            specialisation: ['infectious-disease'],
            description: 'Various bacterial infections can cause fever as the body fights off the infection.',
            treatment: 'Antibiotics prescribed by a healthcare provider, rest, and adequate fluid intake.'
          }
        ],
        triage: {
          level: 'consultation',
          description: 'Your symptoms suggest you should consult with a healthcare provider, especially if the fever is high or persistent.'
        }
      },
      
      // Default response for other symptoms
      'default': {
        conditions: [
          {
            id: 'cond_7',
            name: 'Multiple potential conditions',
            commonName: 'Various conditions',
            probability: 0.50,
            specialisation: ['general-practice'],
            description: 'Your symptoms could be related to various conditions. A proper medical consultation is recommended for accurate diagnosis.',
            treatment: 'Treatment depends on the specific diagnosis. Please consult a healthcare provider.'
          }
        ],
        triage: {
          level: 'consultation',
          description: 'Based on your symptoms, it is recommended to consult with a healthcare provider for proper evaluation.'
        }
      }
    };
    
    // Find the first symptom ID in the request to determine which mock response to use
    const firstSymptomId = data.symptoms[0]?.id;
    const response = mockResponses[firstSymptomId] || mockResponses['default'];
    
    // Add a realistic delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return response;
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    throw new Error('Failed to analyze symptoms');
  }
};
