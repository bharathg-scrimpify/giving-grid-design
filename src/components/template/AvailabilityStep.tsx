
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface AvailabilityStepProps {
  type: 'need' | 'offer' | null;
  data: any;
  onUpdate: (data: any) => void;
}

const AvailabilityStep = ({ type, data, onUpdate }: AvailabilityStepProps) => {
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);
  const [timeSlots, setTimeSlots] = React.useState<string[]>([]);

  const timeOptions = [
    'Morning (9AM - 12PM)',
    'Afternoon (12PM - 5PM)',
    'Evening (5PM - 8PM)',
    'Flexible timing'
  ];

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    const newDates = selectedDates.some(d => d.toDateString() === date.toDateString())
      ? selectedDates.filter(d => d.toDateString() !== date.toDateString())
      : [...selectedDates, date];
    
    setSelectedDates(newDates);
    onUpdate({ availability: { dates: newDates, timeSlots } });
  };

  const handleTimeSlotToggle = (slot: string) => {
    const newSlots = timeSlots.includes(slot)
      ? timeSlots.filter(s => s !== slot)
      : [...timeSlots, slot];
    
    setTimeSlots(newSlots);
    onUpdate({ availability: { dates: selectedDates, timeSlots: newSlots } });
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">When are you available?</h2>
        <p className="text-gray-600 text-lg">
          {type === 'offer' 
            ? 'Let people know when you can provide your service'
            : 'When do you need this help?'
          }
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Select Dates
              </h3>
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={(dates) => {
                  if (dates) {
                    setSelectedDates(Array.isArray(dates) ? dates : [dates]);
                    onUpdate({ availability: { dates: Array.isArray(dates) ? dates : [dates], timeSlots } });
                  }
                }}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
            </CardContent>
          </Card>

          {/* Time Slots */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Preferred Time</h3>
                <div className="space-y-3">
                  {timeOptions.map((slot) => (
                    <div
                      key={slot}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        timeSlots.includes(slot)
                          ? type === 'offer'
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleTimeSlotToggle(slot)}
                    >
                      <span className="font-medium">{slot}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Summary */}
            {(selectedDates.length > 0 || timeSlots.length > 0) && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Your Availability</h3>
                  
                  {selectedDates.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">Selected Dates:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedDates.map((date) => (
                          <Badge key={date.toISOString()} variant="secondary">
                            {date.toLocaleDateString()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {timeSlots.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Time Preferences:</p>
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.map((slot) => (
                          <Badge key={slot} variant="outline">
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityStep;
