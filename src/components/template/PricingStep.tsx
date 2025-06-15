
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, Gift, Clock } from 'lucide-react';

interface PricingStepProps {
  type: 'need' | 'offer' | null;
  data: any;
  onUpdate: (data: any) => void;
}

const PricingStep = ({ type, data, onUpdate }: PricingStepProps) => {
  const [pricingType, setPricingType] = React.useState<'free' | 'paid' | 'negotiable'>('paid');
  const [amount, setAmount] = React.useState('');

  const handlePricingTypeChange = (type: 'free' | 'paid' | 'negotiable') => {
    setPricingType(type);
    if (type === 'free') {
      onUpdate({ pricing: 'Free' });
    } else if (type === 'negotiable') {
      onUpdate({ pricing: 'Negotiable' });
    }
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    onUpdate({ pricing: `$${value}` });
  };

  const pricingOptions = [
    {
      id: 'free',
      title: type === 'offer' ? "I'm offering for free" : "Looking for free help",
      subtitle: type === 'offer' ? 'Give back to the community' : 'Community support',
      icon: Gift,
      color: 'green'
    },
    {
      id: 'paid',
      title: type === 'offer' ? 'Set a price' : 'I can pay',
      subtitle: type === 'offer' ? 'Charge for your service' : 'Budget available',
      icon: DollarSign,
      color: type === 'offer' ? 'orange' : 'blue'
    },
    {
      id: 'negotiable',
      title: 'Price negotiable',
      subtitle: 'Discuss pricing later',
      icon: Clock,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseColors = {
      green: isSelected ? 'border-green-500 bg-green-50' : 'hover:border-green-300',
      orange: isSelected ? 'border-orange-500 bg-orange-50' : 'hover:border-orange-300',
      blue: isSelected ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-300',
      purple: isSelected ? 'border-purple-500 bg-purple-50' : 'hover:border-purple-300'
    };
    return baseColors[color as keyof typeof baseColors];
  };

  const getIconColorClass = (color: string) => {
    const iconColors = {
      green: 'text-green-500',
      orange: 'text-orange-500',
      blue: 'text-blue-500',
      purple: 'text-purple-500'
    };
    return iconColors[color as keyof typeof iconColors];
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          {type === 'offer' ? 'What do you charge?' : 'What\'s your budget?'}
        </h2>
        <p className="text-gray-600 text-lg">
          {type === 'offer' 
            ? 'Set your pricing or offer your service for free'
            : 'Let people know your budget or if you need free help'
          }
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Pricing Type Selection */}
        <div className="grid gap-4 mb-6">
          {pricingOptions.map((option) => {
            const IconComponent = option.icon;
            const isSelected = pricingType === option.id;
            
            return (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all duration-300 border-2 ${
                  getColorClasses(option.color, isSelected)
                } ${!isSelected ? 'border-gray-200' : ''}`}
                onClick={() => handlePricingTypeChange(option.id as any)}
              >
                <CardContent className="p-6 flex items-center">
                  <IconComponent className={`w-8 h-8 mr-4 ${getIconColorClass(option.color)}`} />
                  <div>
                    <h3 className="font-semibold text-lg">{option.title}</h3>
                    <p className="text-gray-600">{option.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Amount Input */}
        {pricingType === 'paid' && (
          <Card>
            <CardContent className="p-6">
              <Label htmlFor="amount" className="text-base font-medium mb-3 block">
                {type === 'offer' ? 'Your rate' : 'Your budget'}
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="pl-10 text-base p-3 h-12"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {type === 'offer' 
                  ? 'Set a fair price for your service. You can always negotiate later.'
                  : 'Enter the maximum amount you\'re willing to pay.'
                }
              </p>
            </CardContent>
          </Card>
        )}

        {pricingType === 'free' && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <Gift className="w-12 h-12 mx-auto mb-3 text-green-500" />
              <h3 className="font-semibold text-lg mb-2">
                {type === 'offer' ? 'Offering for Free' : 'Looking for Free Help'}
              </h3>
              <p className="text-gray-600">
                {type === 'offer' 
                  ? 'Thank you for giving back to the community!'
                  : 'Many community members are happy to help for free.'
                }
              </p>
            </CardContent>
          </Card>
        )}

        {pricingType === 'negotiable' && (
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 mx-auto mb-3 text-purple-500" />
              <h3 className="font-semibold text-lg mb-2">Price Negotiable</h3>
              <p className="text-gray-600">
                You can discuss pricing details when someone reaches out to you.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PricingStep;
