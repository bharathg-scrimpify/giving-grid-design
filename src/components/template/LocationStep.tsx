
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Globe } from 'lucide-react';

interface LocationStepProps {
  type: 'need' | 'offer' | null;
  data: any;
  onUpdate: (data: any) => void;
}

const LocationStep = ({ type, data, onUpdate }: LocationStepProps) => {
  const [locationType, setLocationType] = React.useState<'local' | 'remote'>('local');

  const handleLocationChange = (value: string) => {
    onUpdate({ location: value });
  };

  const handleLocationTypeChange = (type: 'local' | 'remote') => {
    setLocationType(type);
    if (type === 'remote') {
      onUpdate({ location: 'Remote/Online' });
    } else {
      onUpdate({ location: '' });
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Where will this happen?</h2>
        <p className="text-gray-600 text-lg">
          {type === 'offer' 
            ? 'Let people know where you can provide your service'
            : 'Specify where you need help or if it can be done remotely'
          }
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {/* Location Type Selection */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Card 
            className={`cursor-pointer transition-all duration-300 border-2 ${
              locationType === 'local' 
                ? type === 'offer' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleLocationTypeChange('local')}
          >
            <CardContent className="p-6 text-center">
              <MapPin className={`w-8 h-8 mx-auto mb-3 ${
                locationType === 'local' 
                  ? type === 'offer' ? 'text-orange-500' : 'text-blue-500'
                  : 'text-gray-400'
              }`} />
              <h3 className="font-semibold mb-1">In Person</h3>
              <p className="text-sm text-gray-600">Meet at a specific location</p>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all duration-300 border-2 ${
              locationType === 'remote' 
                ? type === 'offer' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleLocationTypeChange('remote')}
          >
            <CardContent className="p-6 text-center">
              <Globe className={`w-8 h-8 mx-auto mb-3 ${
                locationType === 'remote' 
                  ? type === 'offer' ? 'text-orange-500' : 'text-blue-500'
                  : 'text-gray-400'
              }`} />
              <h3 className="font-semibold mb-1">Remote/Online</h3>
              <p className="text-sm text-gray-600">Work from anywhere</p>
            </CardContent>
          </Card>
        </div>

        {/* Location Input */}
        {locationType === 'local' && (
          <div>
            <Label htmlFor="location" className="text-base font-medium mb-2 block">
              Location
            </Label>
            <Input
              id="location"
              placeholder="Enter city, neighborhood, or specific address"
              value={data.location || ''}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="text-base p-3 h-12"
            />
            <p className="text-sm text-gray-500 mt-2">
              Don't worry about being too specific - you can always discuss exact details later
            </p>
          </div>
        )}

        {locationType === 'remote' && (
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <Globe className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <h3 className="font-semibold mb-2">Remote/Online Service</h3>
            <p className="text-gray-600">
              This {type === 'offer' ? 'service' : 'request'} can be completed remotely via video calls, online collaboration, or digital delivery.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationStep;
