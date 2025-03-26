
import React, { useState, useEffect } from 'react';
import { getUserLocation, findNearbyHospitals, Hospital, recommendDoctorType } from '@/utils/locationUtils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { MapPin, Calendar, Clock, ExternalLink, Loader2 } from 'lucide-react';

interface HospitalFinderProps {
  symptoms?: string[];
  urgency?: 'low' | 'medium' | 'high';
  onClose?: () => void;
}

const HospitalFinder: React.FC<HospitalFinderProps> = ({ symptoms = [], urgency = 'low', onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [recommendedSpecialist, setRecommendedSpecialist] = useState<string>('General Practitioner');
  const { translate } = useLanguage();

  useEffect(() => {
    // Determine recommended specialist based on symptoms
    if (symptoms.length > 0) {
      setRecommendedSpecialist(recommendDoctorType(symptoms));
    }
  }, [symptoms]);

  const findHospitals = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get user location
      const location = await getUserLocation();
      
      // Find nearby hospitals
      const nearbyHospitals = await findNearbyHospitals(location);
      
      if (nearbyHospitals.length === 0) {
        setError('No hospitals found nearby. Please try again later.');
      } else {
        setHospitals(nearbyHospitals);
        toast.success('Found nearby medical facilities', {
          description: `${nearbyHospitals.length} facilities located near you.`
        });
      }
    } catch (err) {
      console.error('Error finding hospitals:', err);
      setError('Could not access your location. Please enable location services and try again.');
      toast.error('Location access denied', {
        description: 'Please enable location access in your browser settings.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        {urgency === 'high' ? 'Emergency Medical Facilities Nearby' : 'Find Medical Facilities'}
      </h3>
      
      {recommendedSpecialist && (
        <div className="mb-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-700">
            Based on your symptoms, we recommend consulting a <strong>{recommendedSpecialist}</strong>
          </p>
        </div>
      )}
      
      {!isLoading && hospitals.length === 0 && (
        <Button 
          className={`w-full ${urgency === 'high' ? 'bg-red-500 hover:bg-red-600' : 'health-gradient'}`} 
          onClick={findHospitals}
        >
          <MapPin size={16} className="mr-2" />
          {urgency === 'high' ? 'Find Emergency Services Now' : 'Find Nearby Hospitals'}
        </Button>
      )}
      
      {isLoading && (
        <div className="flex justify-center items-center py-6">
          <Loader2 size={24} className="animate-spin text-health-500 mr-2" />
          <span>Finding medical facilities near you...</span>
        </div>
      )}
      
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {hospitals.length > 0 && (
        <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="border rounded-md p-3 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{hospital.name}</h4>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {hospital.distance} km
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{hospital.address}</p>
              {hospital.specialties && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {hospital.specialties.map((specialty, index) => (
                    <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2 mt-3">
                <a 
                  href={hospital.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs flex items-center text-blue-600 hover:underline"
                >
                  <ExternalLink size={12} className="mr-1" />
                  View on Maps
                </a>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs ml-auto py-0 h-6"
                  onClick={() => toast.success('Booking feature will be implemented soon')}
                >
                  <Calendar size={12} className="mr-1" />
                  Book Appointment
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HospitalFinder;
