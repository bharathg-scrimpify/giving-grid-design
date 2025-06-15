
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, CalendarDays, RotateCcw } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface AvailabilityStepProps {
  type: 'need' | 'offer' | null;
  data: any;
  onUpdate: (data: any) => void;
}

const AvailabilityStep = ({ type, data, onUpdate }: AvailabilityStepProps) => {
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [timeSlots, setTimeSlots] = React.useState<string[]>([]);
  const [recurrence, setRecurrence] = React.useState({
    enabled: false,
    pattern: 'weekly',
    interval: 1,
    daysOfWeek: [] as number[],
    endDate: undefined as Date | undefined
  });

  const timeOptions = [
    'Morning (9AM - 12PM)',
    'Afternoon (12PM - 5PM)',
    'Evening (5PM - 8PM)',
    'Flexible timing'
  ];

  const recurrencePatterns = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const daysOfWeek = [
    { value: 0, label: 'Sun' },
    { value: 1, label: 'Mon' },
    { value: 2, label: 'Tue' },
    { value: 3, label: 'Wed' },
    { value: 4, label: 'Thu' },
    { value: 5, label: 'Fri' },
    { value: 6, label: 'Sat' }
  ];

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    const newDates = selectedDates.some(d => d.toDateString() === date.toDateString())
      ? selectedDates.filter(d => d.toDateString() !== date.toDateString())
      : [...selectedDates, date];
    
    setSelectedDates(newDates);
    updateAvailability({ dates: newDates, dateRange, timeSlots, recurrence });
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    updateAvailability({ dates: selectedDates, dateRange: range, timeSlots, recurrence });
  };

  const handleTimeSlotToggle = (slot: string) => {
    const newSlots = timeSlots.includes(slot)
      ? timeSlots.filter(s => s !== slot)
      : [...timeSlots, slot];
    
    setTimeSlots(newSlots);
    updateAvailability({ dates: selectedDates, dateRange, timeSlots: newSlots, recurrence });
  };

  const handleRecurrenceChange = (field: string, value: any) => {
    const newRecurrence = { ...recurrence, [field]: value };
    setRecurrence(newRecurrence);
    updateAvailability({ dates: selectedDates, dateRange, timeSlots, recurrence: newRecurrence });
  };

  const handleDayOfWeekToggle = (day: number) => {
    const newDays = recurrence.daysOfWeek.includes(day)
      ? recurrence.daysOfWeek.filter(d => d !== day)
      : [...recurrence.daysOfWeek, day];
    
    handleRecurrenceChange('daysOfWeek', newDays);
  };

  const updateAvailability = (availability: any) => {
    onUpdate({ availability });
  };

  const generateRecurringDates = () => {
    if (!recurrence.enabled || !dateRange?.from) return [];
    
    const dates: Date[] = [];
    const startDate = new Date(dateRange.from);
    const endDate = recurrence.endDate || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 3 months default
    
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      if (recurrence.pattern === 'weekly' && recurrence.daysOfWeek.length > 0) {
        if (recurrence.daysOfWeek.includes(currentDate.getDay())) {
          dates.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (recurrence.pattern === 'daily') {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + recurrence.interval);
      } else if (recurrence.pattern === 'monthly') {
        dates.push(new Date(currentDate));
        currentDate.setMonth(currentDate.getMonth() + recurrence.interval);
      } else {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    
    return dates.slice(0, 50); // Limit to 50 dates for performance
  };

  const recurringDates = generateRecurringDates();
  const allAvailableDates = [...selectedDates, ...recurringDates];

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

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="individual" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="individual" className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      Individual Dates
                    </TabsTrigger>
                    <TabsTrigger value="range" className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Date Range
                    </TabsTrigger>
                    <TabsTrigger value="recurring" className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Recurring
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="individual" className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Select Individual Dates</h3>
                    <Calendar
                      mode="multiple"
                      selected={selectedDates}
                      onSelect={(dates) => {
                        if (dates) {
                          const dateArray = Array.isArray(dates) ? dates : [dates];
                          setSelectedDates(dateArray);
                          updateAvailability({ dates: dateArray, dateRange, timeSlots, recurrence });
                        }
                      }}
                      className="rounded-md border"
                      disabled={(date) => date < new Date()}
                    />
                  </TabsContent>
                  
                  <TabsContent value="range" className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Select Date Range</h3>
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={handleRangeSelect}
                      className="rounded-md border"
                      disabled={(date) => date < new Date()}
                    />
                    {dateRange?.from && dateRange?.to && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium">
                          Selected: {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="recurring" className="mt-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Set Up Recurring Availability</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRecurrenceChange('enabled', !recurrence.enabled)}
                          className={recurrence.enabled ? 'bg-green-50 border-green-200' : ''}
                        >
                          {recurrence.enabled ? 'Enabled' : 'Enable'}
                        </Button>
                      </div>
                      
                      {recurrence.enabled && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium mb-2 block">Repeat Pattern</label>
                              <Select
                                value={recurrence.pattern}
                                onValueChange={(value) => handleRecurrenceChange('pattern', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {recurrencePatterns.map((pattern) => (
                                    <SelectItem key={pattern.value} value={pattern.value}>
                                      {pattern.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium mb-2 block">Every</label>
                              <Select
                                value={recurrence.interval.toString()}
                                onValueChange={(value) => handleRecurrenceChange('interval', parseInt(value))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {[1, 2, 3, 4].map((num) => (
                                    <SelectItem key={num} value={num.toString()}>
                                      {num} {recurrence.pattern === 'weekly' ? 'week(s)' : recurrence.pattern === 'daily' ? 'day(s)' : 'month(s)'}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          {recurrence.pattern === 'weekly' && (
                            <div>
                              <label className="text-sm font-medium mb-3 block">Days of the Week</label>
                              <div className="flex gap-2">
                                {daysOfWeek.map((day) => (
                                  <Button
                                    key={day.value}
                                    variant={recurrence.daysOfWeek.includes(day.value) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handleDayOfWeekToggle(day.value)}
                                    className="w-12 h-12 p-0"
                                  >
                                    {day.label}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div>
                            <label className="text-sm font-medium mb-2 block">End Date (Optional)</label>
                            <Calendar
                              mode="single"
                              selected={recurrence.endDate}
                              onSelect={(date) => handleRecurrenceChange('endDate', date)}
                              className="rounded-md border"
                              disabled={(date) => date < new Date()}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Time Slots and Summary */}
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

            {/* Availability Summary */}
            {(allAvailableDates.length > 0 || timeSlots.length > 0 || dateRange) && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Your Availability Summary</h3>
                  
                  {selectedDates.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">Individual Dates:</p>
                      <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                        {selectedDates.slice(0, 10).map((date) => (
                          <Badge key={date.toISOString()} variant="secondary">
                            {date.toLocaleDateString()}
                          </Badge>
                        ))}
                        {selectedDates.length > 10 && (
                          <Badge variant="outline">+{selectedDates.length - 10} more</Badge>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {dateRange?.from && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">Date Range:</p>
                      <Badge variant="secondary">
                        {dateRange.from.toLocaleDateString()} - {dateRange.to?.toLocaleDateString() || 'Ongoing'}
                      </Badge>
                    </div>
                  )}
                  
                  {recurrence.enabled && recurringDates.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Recurring ({recurrence.pattern}, {recurringDates.length} dates):
                      </p>
                      <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                        {recurringDates.slice(0, 5).map((date) => (
                          <Badge key={date.toISOString()} variant="outline">
                            {date.toLocaleDateString()}
                          </Badge>
                        ))}
                        {recurringDates.length > 5 && (
                          <Badge variant="outline">+{recurringDates.length - 5} more</Badge>
                        )}
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
