
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

const PhoneDetails = ({ phoneData, updatePhoneData, nextStep, prevStep }) => {
  const [formData, setFormData] = useState({
    brand: phoneData.brand || '',
    model: phoneData.model || '',
    storage: phoneData.storage || '',
    imei: phoneData.imei || '',
    phoneNumber: phoneData.phoneNumber || '',
    batteryHealth: phoneData.batteryHealth || ''
  });

  const phoneDatabase = {
    Apple: [
      'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
      'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
      'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 mini',
      'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 12 mini',
      'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11',
      'iPhone XS Max', 'iPhone XS', 'iPhone XR',
      'iPhone X', 'iPhone 8 Plus', 'iPhone 8'
    ],
    Samsung: [
      'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24',
      'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23',
      'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22',
      'Galaxy S21 Ultra', 'Galaxy S21+', 'Galaxy S21',
      'Galaxy Note 20 Ultra', 'Galaxy Note 20',
      'Galaxy A54', 'Galaxy A34', 'Galaxy A14',
      'Galaxy Z Fold 5', 'Galaxy Z Flip 5'
    ],
    Google: [
      'Pixel 8 Pro', 'Pixel 8', 'Pixel 7a',
      'Pixel 7 Pro', 'Pixel 7',
      'Pixel 6 Pro', 'Pixel 6', 'Pixel 6a',
      'Pixel 5', 'Pixel 4a', 'Pixel 4'
    ],
    OnePlus: [
      'OnePlus 12', 'OnePlus 11', 'OnePlus 10 Pro',
      'OnePlus 9 Pro', 'OnePlus 9', 'OnePlus 8T',
      'OnePlus 8 Pro', 'OnePlus 8', 'OnePlus Nord'
    ],
    Xiaomi: [
      'Xiaomi 14', 'Xiaomi 13 Pro', 'Xiaomi 13',
      'Xiaomi 12 Pro', 'Xiaomi 12',
      'Redmi Note 13', 'Redmi Note 12', 'POCO X5'
    ],
    Huawei: [
      'P60 Pro', 'P50 Pro', 'Mate 50 Pro',
      'Nova 11', 'Y90', 'P40 Pro'
    ],
    Sony: [
      'Xperia 1 V', 'Xperia 5 V', 'Xperia 10 V',
      'Xperia 1 IV', 'Xperia 5 IV'
    ],
    LG: [
      'V60 ThinQ', 'G8 ThinQ', 'Velvet'
    ],
    Motorola: [
      'Edge 40 Pro', 'Edge 30', 'Moto G Power',
      'Razr 40', 'Razr 40 Ultra'
    ]
  };

  const brands = Object.keys(phoneDatabase);
  const availableModels = formData.brand ? phoneDatabase[formData.brand] || [] : [];

  const storageOptions = [
    '32GB', '64GB', '128GB', '256GB', '512GB', '1TB'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      // Reset model when brand changes
      if (field === 'brand' && value !== prev.brand) {
        newData.model = '';
      }
      return newData;
    });
  };

  const handleSubmit = () => {
    updatePhoneData(formData);
    nextStep();
  };

  const isFormValid = formData.brand && formData.model && formData.storage && 
                     formData.imei && formData.phoneNumber && formData.batteryHealth;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Phone Details</h2>
        <p className="text-gray-600">Please provide your device information</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="brand">Brand *</Label>
            <Select value={formData.brand} onValueChange={(value) => handleInputChange('brand', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="model">Model *</Label>
            <Select 
              value={formData.model} 
              onValueChange={(value) => handleInputChange('model', value)}
              disabled={!formData.brand}
            >
              <SelectTrigger>
                <SelectValue placeholder={formData.brand ? "Select model" : "Select brand first"} />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map(model => (
                  <SelectItem key={model} value={model}>{model}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="storage">Storage Capacity *</Label>
            <Select value={formData.storage} onValueChange={(value) => handleInputChange('storage', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select storage" />
              </SelectTrigger>
              <SelectContent>
                {storageOptions.map(storage => (
                  <SelectItem key={storage} value={storage}>{storage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="imei">IMEI Number *</Label>
            <Input
              id="imei"
              value={formData.imei}
              onChange={(e) => handleInputChange('imei', e.target.value)}
              placeholder="15-digit IMEI number"
              className="mt-1"
              maxLength={15}
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="Your phone number"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="batteryHealth">Battery Health *</Label>
            <Input
              id="batteryHealth"
              value={formData.batteryHealth}
              onChange={(e) => handleInputChange('batteryHealth', e.target.value)}
              placeholder="e.g., 85% or Good"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200 p-4">
        <div className="text-sm text-blue-800">
          <strong>Data Storage:</strong> All diagnostic data is automatically saved with timestamps. 
          Records are retained for 3 months and each evaluation receives a unique receipt number for tracking.
        </div>
      </Card>

      <Card className="bg-yellow-50 border-yellow-200 p-4">
        <div className="text-sm text-yellow-800">
          <strong>Tip:</strong> You can find your IMEI by dialing *#06# on your phone or checking Settings → About Phone.
        </div>
      </Card>

      <div className="flex justify-between pt-6">
        <Button 
          onClick={prevStep}
          variant="outline"
          className="px-6 py-2"
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-2"
        >
          Continue to Diagnostic
        </Button>
      </div>
    </div>
  );
};

export default PhoneDetails;
