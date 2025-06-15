
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, MapPin, Calendar, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import TypeSelection from '@/components/template/TypeSelection';
import CategoryStep from '@/components/template/CategoryStep';
import DetailsStep from '@/components/template/DetailsStep';
import LocationStep from '@/components/template/LocationStep';
import AvailabilityStep from '@/components/template/AvailabilityStep';
import PricingStep from '@/components/template/PricingStep';
import ReviewStep from '@/components/template/ReviewStep';

const CreateTemplate = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [templateType, setTemplateType] = useState<'need' | 'offer' | null>(null);
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    name: '',
    description: '',
    location: '',
    availability: {},
    pricing: ''
  });

  const steps = [
    { id: 'type', title: 'Type', icon: Check },
    { id: 'category', title: 'Category', icon: Check },
    { id: 'details', title: 'Details', icon: Check },
    { id: 'location', title: 'Location', icon: MapPin },
    { id: 'availability', title: 'Availability', icon: Calendar },
    { id: 'pricing', title: 'Pricing', icon: DollarSign },
    { id: 'review', title: 'Review', icon: Check }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <TypeSelection selectedType={templateType} onTypeSelect={setTemplateType} />;
      case 1:
        return <CategoryStep type={templateType} data={formData} onUpdate={updateFormData} />;
      case 2:
        return <DetailsStep type={templateType} data={formData} onUpdate={updateFormData} />;
      case 3:
        return <LocationStep type={templateType} data={formData} onUpdate={updateFormData} />;
      case 4:
        return <AvailabilityStep type={templateType} data={formData} onUpdate={updateFormData} />;
      case 5:
        return <PricingStep type={templateType} data={formData} onUpdate={updateFormData} />;
      case 6:
        return <ReviewStep type={templateType} data={formData} />;
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return templateType !== null;
      case 1:
        return formData.category !== '';
      case 2:
        return formData.name && formData.description;
      case 3:
        return formData.location !== '';
      case 4:
        return Object.keys(formData.availability).length > 0;
      case 5:
        return formData.pricing !== '';
      default:
        return true;
    }
  };

  const themeClass = templateType === 'offer' 
    ? 'bg-gradient-to-br from-orange-50 to-red-50' 
    : templateType === 'need' 
    ? 'bg-gradient-to-br from-blue-50 to-indigo-50'
    : 'bg-gray-50';

  return (
    <div className={`min-h-screen transition-all duration-700 ${themeClass}`}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-semibold">
              {templateType === 'offer' ? 'Create an Offer' : templateType === 'need' ? 'Post a Need' : 'Create Template'}
            </h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const IconComponent = step.icon;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                    ${isActive 
                      ? templateType === 'offer' 
                        ? 'border-orange-500 bg-orange-500 text-white' 
                        : 'border-blue-500 bg-blue-500 text-white'
                      : isCompleted 
                      ? 'border-green-500 bg-green-500 text-white' 
                      : 'border-gray-300 bg-white text-gray-400'
                    }
                  `}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`px-6 ${
              templateType === 'offer' 
                ? 'bg-orange-500 hover:bg-orange-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {currentStep === steps.length - 1 ? 'Publish' : 'Continue'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplate;
