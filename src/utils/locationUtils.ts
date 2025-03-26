
import axios from 'axios';

// Types for location and hospital data
export interface Location {
  latitude: number;
  longitude: number;
}

export interface Hospital {
  id: string;
  name: string;
  distance: number;
  address: string;
  type: string;
  specialties?: string[];
  googleMapsUrl: string;
}

// Get user's current location
export const getUserLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

// Find nearby hospitals using Nominatim API
export const findNearbyHospitals = async (location: Location): Promise<Hospital[]> => {
  try {
    // Using Nominatim API to search for hospitals
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: 'hospital',
        format: 'json',
        addressdetails: 1,
        limit: 5,
        'accept-language': 'en',
        lat: location.latitude,
        lon: location.longitude,
        radius: 5000
      },
      headers: {
        'User-Agent': 'HealthHiveBuddy/1.0'
      }
    });

    if (response.data && Array.isArray(response.data)) {
      // Map the response to our Hospital interface
      return response.data.map((item: any, index: number) => ({
        id: item.place_id || `hospital-${index}`,
        name: item.name || (item.address?.amenity || 'Hospital'),
        distance: calculateDistance(
          location.latitude, 
          location.longitude, 
          parseFloat(item.lat), 
          parseFloat(item.lon)
        ),
        address: formatAddress(item.address),
        type: item.type || 'hospital',
        specialties: getSpecialtiesFromTags(item.tags),
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lon}`
      }));
    }

    return [];
  } catch (error) {
    console.error('Error finding nearby hospitals:', error);
    return [];
  }
};

// Calculate distance between two coordinates in kilometers
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1)); // Distance in km
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

const formatAddress = (addressObj: any): string => {
  if (!addressObj) return 'Address not available';
  
  const parts = [
    addressObj.road,
    addressObj.suburb,
    addressObj.city || addressObj.town,
    addressObj.state,
    addressObj.postcode,
    addressObj.country
  ].filter(Boolean);
  
  return parts.join(', ');
};

// Dummy function to extract specialties from OSM tags
// In a real implementation, this would be more sophisticated
const getSpecialtiesFromTags = (tags: any): string[] | undefined => {
  // Mock specialties based on hospital name or type
  const specialtiesList = [
    'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 
    'Oncology', 'General Medicine', 'Emergency Care'
  ];
  
  // Return random specialties (1-3)
  const count = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...specialtiesList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Recommend doctor specialists based on symptoms
export const recommendDoctorType = (symptoms: string[]): string => {
  // This is a simplified mapping of symptoms to medical specialties
  const symptomToSpecialty: Record<string, string> = {
    'chest pain': 'Cardiologist',
    'heart': 'Cardiologist',
    'headache': 'Neurologist',
    'migraine': 'Neurologist',
    'brain': 'Neurologist',
    'joint pain': 'Orthopedist',
    'bone': 'Orthopedist',
    'child': 'Pediatrician',
    'skin': 'Dermatologist',
    'rash': 'Dermatologist',
    'breathing': 'Pulmonologist',
    'lung': 'Pulmonologist',
    'stomach': 'Gastroenterologist',
    'digestion': 'Gastroenterologist',
    'eye': 'Ophthalmologist',
    'vision': 'Ophthalmologist',
    'ear': 'Otolaryngologist',
    'hearing': 'Otolaryngologist',
    'throat': 'Otolaryngologist',
    'pregnancy': 'Obstetrician',
    'female': 'Gynecologist',
    'mental': 'Psychiatrist',
    'depression': 'Psychiatrist',
    'anxiety': 'Psychiatrist',
    'diabetes': 'Endocrinologist',
    'hormone': 'Endocrinologist',
    'kidney': 'Nephrologist',
    'urine': 'Urologist'
  };
  
  for (const symptom of symptoms) {
    for (const [key, specialty] of Object.entries(symptomToSpecialty)) {
      if (symptom.toLowerCase().includes(key)) {
        return specialty;
      }
    }
  }
  
  return 'General Practitioner';
};
