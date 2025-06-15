
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Hammer, Camera, Book, Car, Home, Users, Briefcase, Utensils } from 'lucide-react';

interface CategoryStepProps {
  type: 'need' | 'offer' | null;
  data: any;
  onUpdate: (data: any) => void;
}

const CategoryStep = ({ type, data, onUpdate }: CategoryStepProps) => {
  const categories = [
    { id: 'services', name: 'Services', icon: Hammer, color: 'blue' },
    { id: 'creative', name: 'Creative', icon: Camera, color: 'purple' },
    { id: 'education', name: 'Education', icon: Book, color: 'green' },
    { id: 'transport', name: 'Transport', icon: Car, color: 'red' },
    { id: 'housing', name: 'Housing', icon: Home, color: 'orange' },
    { id: 'events', name: 'Events', icon: Users, color: 'pink' },
    { id: 'business', name: 'Business', icon: Briefcase, color: 'indigo' },
    { id: 'food', name: 'Food & Dining', icon: Utensils, color: 'yellow' }
  ];

  const handleCategorySelect = (categoryId: string) => {
    onUpdate({ category: categoryId });
  };

  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseColors = {
      blue: isSelected ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-300',
      purple: isSelected ? 'border-purple-500 bg-purple-50' : 'hover:border-purple-300',
      green: isSelected ? 'border-green-500 bg-green-50' : 'hover:border-green-300',
      red: isSelected ? 'border-red-500 bg-red-50' : 'hover:border-red-300',
      orange: isSelected ? 'border-orange-500 bg-orange-50' : 'hover:border-orange-300',
      pink: isSelected ? 'border-pink-500 bg-pink-50' : 'hover:border-pink-300',
      indigo: isSelected ? 'border-indigo-500 bg-indigo-50' : 'hover:border-indigo-300',
      yellow: isSelected ? 'border-yellow-500 bg-yellow-50' : 'hover:border-yellow-300'
    };
    return baseColors[color as keyof typeof baseColors];
  };

  const getIconColorClass = (color: string) => {
    const iconColors = {
      blue: 'text-blue-500',
      purple: 'text-purple-500',
      green: 'text-green-500',
      red: 'text-red-500',
      orange: 'text-orange-500',
      pink: 'text-pink-500',
      indigo: 'text-indigo-500',
      yellow: 'text-yellow-500'
    };
    return iconColors[color as keyof typeof iconColors];
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          {type === 'offer' ? 'What are you offering?' : 'What do you need help with?'}
        </h2>
        <p className="text-gray-600 text-lg">
          {type === 'offer' 
            ? 'Select the category that best describes what you can provide'
            : 'Choose the category that matches what you\'re looking for'
          }
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = data.category === category.id;
          
          return (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                getColorClasses(category.color, isSelected)
              } ${!isSelected ? 'border-gray-200' : ''}`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <CardContent className="p-6 text-center">
                <IconComponent className={`w-8 h-8 mx-auto mb-3 ${getIconColorClass(category.color)}`} />
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryStep;
