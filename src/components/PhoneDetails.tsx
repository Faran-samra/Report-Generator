
import React, { useState } from 'react';
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

  const brands = [
    'Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Huawei', 'Sony', 'LG', 'Motorola', 'Other'
  ];

  const storageOptions = [
    '32GB', '64GB', '128GB', '256GB', '512GB', '1TB'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            <Input
              id="model"
              value={formData.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              placeholder="e.g., iPhone 14 Pro"
              className="mt-1"
            />
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
