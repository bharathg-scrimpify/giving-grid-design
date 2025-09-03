
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
  const [activeTab, setActiveTab] = React.useState('individual');
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [timeSlots, setTimeSlots] = React.useState<string[]>([]);
  const [customTime, setCustomTime] = React.useState({ start: '', end: '' });
  const [recurrence, setRecurrence] = React.useState({
    pattern: 'weekly',
    interval: 1,
    startDate: undefined as Date | undefined,
    daysOfWeek: [] as number[],
    endDate: undefined as Date | undefined
  });

  const timeOptions = [
    'Morning (9AM - 12PM)',
    'Afternoon (12PM - 5PM)',
    'Evening (5PM - 8PM)',
    'Flexible timing',
    'Custom time'
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Clear other selections when switching tabs
    if (value === 'individual') {
      setDateRange(undefined);
      setRecurrence({ ...recurrence, startDate: undefined, endDate: undefined, daysOfWeek: [] });
    } else if (value === 'range') {
      setSelectedDate(undefined);
      setSelectedDates([]);
      setRecurrence({ ...recurrence, startDate: undefined, endDate: undefined, daysOfWeek: [] });
    } else if (value === 'recurring') {
      setSelectedDate(undefined);
      setSelectedDates([]);
      setDateRange(undefined);
    }
    updateAvailability();
  };

  const handleIndividualDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    updateAvailability();
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    updateAvailability();
  };

  const handleTimeSlotToggle = (slot: string) => {
    const newSlots = timeSlots.includes(slot)
      ? timeSlots.filter(s => s !== slot)
      : [...timeSlots, slot];
    
    setTimeSlots(newSlots);
    updateAvailability();
  };

  const handleRecurrenceChange = (field: string, value: any) => {
    const newRecurrence = { ...recurrence, [field]: value };
    setRecurrence(newRecurrence);
    updateAvailability();
  };

  const handleDayOfWeekToggle = (day: number) => {
    const newDays = recurrence.daysOfWeek.includes(day)
      ? recurrence.daysOfWeek.filter(d => d !== day)
      : [...recurrence.daysOfWeek, day];
    
    handleRecurrenceChange('daysOfWeek', newDays);
  };

  const generateRecurrenceRule = () => {
    if (activeTab !== 'recurring' || !recurrence.startDate) return '';
    
    let rule = `FREQ=${recurrence.pattern.toUpperCase()}`;
    
    if (recurrence.interval > 1) {
      rule += `;INTERVAL=${recurrence.interval}`;
    }
    
    if (recurrence.pattern === 'weekly' && recurrence.daysOfWeek.length > 0) {
      const dayAbbreviations = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
      const days = recurrence.daysOfWeek.map(day => dayAbbreviations[day]).join(',');
      rule += `;BYDAY=${days}`;
    }
    
    if (recurrence.endDate) {
      rule += `;UNTIL=${recurrence.endDate.toISOString().split('T')[0].replace(/-/g, '')}`;
    }
    
    return rule;
  };

  const updateAvailability = () => {
    const availability = {
      activeTab,
      individualDate: selectedDate,
      dateRange,
      timeSlots,
      customTime: customTime.start && customTime.end ? customTime : null,
      recurrence: activeTab === 'recurring' ? recurrence : null
    };
    
    onUpdate({ availability });
    
    // Generate and log recurrence rule
    const recurrenceRule = generateRecurrenceRule();
    if (recurrenceRule) {
      console.log('Recurrence Rule:', recurrenceRule);
    }
  };

  const generateRecurringDates = () => {
    if (activeTab !== 'recurring' || !recurrence.startDate) return [];
    
    const dates: Date[] = [];
    const startDate = new Date(recurrence.startDate);
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
  const allAvailableDates = activeTab === 'individual' && selectedDate ? [selectedDate] : 
                           activeTab === 'recurring' ? recurringDates : [];

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
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="individual" className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      Individual Date
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
                    <h3 className="text-lg font-semibold mb-4">Select Individual Date</h3>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleIndividualDateSelect}
                      className="rounded-md border pointer-events-auto"
                      disabled={(date) => date < new Date()}
                    />
                    {selectedDate && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">
                          Selected: {selectedDate.toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="range" className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Select Date Range</h3>
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={handleRangeSelect}
                      className="rounded-md border pointer-events-auto"
                      disabled={(date) => date < new Date()}
                    />
                    {dateRange?.from && dateRange?.to && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">
                          Selected: {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="recurring" className="mt-6">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Set Up Recurring Availability</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Start Date</label>
                          <Calendar
                            mode="single"
                            selected={recurrence.startDate}
                            onSelect={(date) => handleRecurrenceChange('startDate', date)}
                            className="rounded-md border pointer-events-auto"
                            disabled={(date) => date < new Date()}
                          />
                        </div>
                        
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
                            className="rounded-md border pointer-events-auto"
                            disabled={(date) => date < new Date()}
                          />
                        </div>
                      </div>
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
                    <div key={slot}>
                      <div
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          timeSlots.includes(slot)
                            ? type === 'offer'
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-blue-500 bg-blue-50'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                        onClick={() => handleTimeSlotToggle(slot)}
                      >
                        <span className="font-medium">{slot}</span>
                      </div>
                      
                      {slot === 'Custom time' && timeSlots.includes(slot) && (
                        <div className="mt-3 p-3 bg-muted rounded-lg">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-sm font-medium mb-1 block">Start Time</label>
                              <input
                                type="time"
                                value={customTime.start}
                                onChange={(e) => {
                                  setCustomTime(prev => ({ ...prev, start: e.target.value }));
                                  updateAvailability();
                                }}
                                className="w-full p-2 border rounded-md"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1 block">End Time</label>
                              <input
                                type="time"
                                value={customTime.end}
                                onChange={(e) => {
                                  setCustomTime(prev => ({ ...prev, end: e.target.value }));
                                  updateAvailability();
                                }}
                                className="w-full p-2 border rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability Summary */}
            {(allAvailableDates.length > 0 || timeSlots.length > 0 || dateRange || selectedDate) && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Your Availability Summary</h3>
                  
                  {activeTab === 'individual' && selectedDate && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Individual Date:</p>
                      <Badge variant="secondary">
                        {selectedDate.toLocaleDateString()}
                      </Badge>
                    </div>
                  )}
                  
                  {activeTab === 'range' && dateRange?.from && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Date Range:</p>
                      <Badge variant="secondary">
                        {dateRange.from.toLocaleDateString()} - {dateRange.to?.toLocaleDateString() || 'Ongoing'}
                      </Badge>
                    </div>
                  )}
                  
                  {activeTab === 'recurring' && recurringDates.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2">
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
                      <p className="text-sm font-medium text-muted-foreground mb-2">Time Preferences:</p>
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.map((slot) => (
                          <Badge key={slot} variant="outline">
                            {slot === 'Custom time' && customTime.start && customTime.end 
                              ? `Custom: ${customTime.start} - ${customTime.end}`
                              : slot}
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
