
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface DetailsStepProps {
  type: 'need' | 'offer' | null;
  data: any;
  onUpdate: (data: any) => void;
}

const DetailsStep = ({ type, data, onUpdate }: DetailsStepProps) => {
  const handleChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          {type === 'offer' ? 'Tell us about your offer' : 'Describe what you need'}
        </h2>
        <p className="text-gray-600 text-lg">
          {type === 'offer' 
            ? 'Provide details about what you can offer to help others find you'
            : 'Be specific about what you need so the right people can help you'
          }
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        <div>
          <Label htmlFor="name" className="text-base font-medium mb-2 block">
            {type === 'offer' ? 'Offer Title' : 'What do you need?'}
          </Label>
          <Input
            id="name"
            placeholder={type === 'offer' 
              ? 'e.g., Professional Photography Services'
              : 'e.g., Need help with moving furniture'
            }
            value={data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="text-base p-3 h-12"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-base font-medium mb-2 block">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder={type === 'offer' 
              ? 'Describe your service, experience, and what makes you unique...'
              : 'Provide details about what kind of help you need, when you need it, and any specific requirements...'
            }
            value={data.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className="min-h-32 text-base p-3 resize-none"
            maxLength={500}
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {(data.description || '').length}/500
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;
