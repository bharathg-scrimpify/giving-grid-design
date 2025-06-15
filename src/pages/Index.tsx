
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Search, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
              <h1 className="text-2xl font-bold">EventoPro</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Marketplace</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Dashboard</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Sign In</Button>
              <Button>Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
            Connect, Share, and Get Things Done
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Whether you need help with something or have skills to offer, EventoPro connects you with your community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create-template">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-6 text-lg">
                <Plus className="w-5 h-5 mr-2" />
                Post a Need
              </Button>
            </Link>
            <Link to="/create-template">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 hover:bg-orange-50">
                <Heart className="w-5 h-5 mr-2" />
                Offer Help
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">How EventoPro Works</h3>
            <p className="text-gray-600 text-lg">Simple steps to connect with your community</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold mb-4">Need Something?</h4>
                <p className="text-gray-600 mb-6">
                  Post what you need help with - from moving furniture to learning new skills, 
                  our community is here to help.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Describe what you need</li>
                  <li>• Set your budget and timeline</li>
                  <li>• Connect with helpers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 hover:border-orange-200 transition-colors">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="text-xl font-semibold mb-4">Have Skills to Share?</h4>
                <p className="text-gray-600 mb-6">
                  Offer your skills and services to help others while earning money or 
                  simply giving back to your community.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Share your expertise</li>
                  <li>• Set your own rates</li>
                  <li>• Build your reputation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Popular Categories</h3>
            <p className="text-gray-600">Find help or offer services in these areas</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Home Services', color: 'bg-blue-100 text-blue-700' },
              { name: 'Creative', color: 'bg-purple-100 text-purple-700' },
              { name: 'Education', color: 'bg-green-100 text-green-700' },
              { name: 'Technology', color: 'bg-orange-100 text-orange-700' },
              { name: 'Transportation', color: 'bg-red-100 text-red-700' },
              { name: 'Events', color: 'bg-pink-100 text-pink-700' },
              { name: 'Business', color: 'bg-indigo-100 text-indigo-700' },
              { name: 'Food & Dining', color: 'bg-yellow-100 text-yellow-700' }
            ].map((category) => (
              <div key={category.name} className={`p-4 rounded-lg text-center font-medium ${category.color}`}>
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of people helping each other in their communities
          </p>
          <Link to="/create-template">
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Template
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-orange-500 rounded"></div>
                <span className="font-bold">EventoPro</span>
              </div>
              <p className="text-gray-400">
                Connecting communities through shared needs and offerings.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>How it works</li>
                <li>Pricing</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EventoPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
