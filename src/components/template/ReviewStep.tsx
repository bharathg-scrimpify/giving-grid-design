
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, DollarSign, Tag } from 'lucide-react';

interface ReviewStepProps {
  type: 'need' | 'offer' | null;
  data: any;
}

const ReviewStep = ({ type, data }: ReviewStepProps) => {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Review your {type}</h2>
        <p className="text-gray-600 text-lg">
          Make sure everything looks good before publishing
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className={`${
          type === 'offer' 
            ? 'border-orange-200 bg-gradient-to-br from-orange-50 to-red-50' 
            : 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50'
        }`}>
          <CardContent className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <Badge className={`mb-2 ${
                  type === 'offer' 
                    ? 'bg-orange-500 hover:bg-orange-600' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}>
                  {type === 'offer' ? 'Offering' : 'Need'}
                </Badge>
                <h3 className="text-2xl font-bold text-gray-900">{data.name}</h3>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${
                  type === 'offer' ? 'text-orange-600' : 'text-blue-600'
                }`}>
                  {data.pricing}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">{data.description}</p>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <Tag className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium capitalize">{data.category}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{data.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Availability</p>
                  <p className="font-medium">
                    {data.availability?.dates?.length || 0} dates selected
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Pricing</p>
                  <p className="font-medium">{data.pricing}</p>
                </div>
              </div>
            </div>

            {/* Availability Details */}
            {data.availability?.timeSlots?.length > 0 && (
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Time Preferences:</p>
                <div className="flex flex-wrap gap-2">
                  {data.availability.timeSlots.map((slot: string) => (
                    <Badge key={slot} variant="outline">
                      {slot}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Success Message */}
        <div className="text-center mt-8 p-6 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Ready to publish?</h4>
          <p className="text-gray-600">
            {type === 'offer' 
              ? 'Your offer will be visible to people looking for help in your area.'
              : 'Your request will be shared with people who can help you.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
