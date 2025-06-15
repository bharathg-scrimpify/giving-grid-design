
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Search } from 'lucide-react';

interface TypeSelectionProps {
  selectedType: 'need' | 'offer' | null;
  onTypeSelect: (type: 'need' | 'offer') => void;
}

const TypeSelection = ({ selectedType, onTypeSelect }: TypeSelectionProps) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">What would you like to do?</h2>
      <p className="text-gray-600 mb-12 text-lg">Choose whether you're offering something or looking for something</p>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
            selectedType === 'offer' 
              ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg' 
              : 'border-gray-200 hover:border-orange-300'
          }`}
          onClick={() => onTypeSelect('offer')}
        >
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">I'm Offering</h3>
            <p className="text-gray-600 leading-relaxed">
              Share your skills, services, or items with others. Help your community by providing what you can offer.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Services</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Skills</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Items</span>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
            selectedType === 'need' 
              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg' 
              : 'border-gray-200 hover:border-blue-300'
          }`}
          onClick={() => onTypeSelect('need')}
        >
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">I Need Help</h3>
            <p className="text-gray-600 leading-relaxed">
              Looking for specific services, skills, or items? Post your needs and connect with people who can help.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Services</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Skills</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Items</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TypeSelection;
