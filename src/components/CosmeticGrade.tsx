import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CosmeticGrade = ({ phoneData, updatePhoneData, nextStep, prevStep }) => {
  const [selectedGrade, setSelectedGrade] = useState(phoneData.cosmeticGrade || '');
  const [pricingData, setPricingData] = useState([]);

  useEffect(() => {
    const storedPricing = localStorage.getItem('devicePricing');
    if (storedPricing) {
      try {
        setPricingData(JSON.parse(storedPricing));
      } catch (err) {
        console.error('Failed to parse pricing data', err);
      }
    }
  }, []);

  const grades = [
    {
      grade: 'A',
      title: 'Excellent Condition',
      description: 'No visible scratches or damage. Looks like new.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 border-green-200',
      textColor: 'text-green-700'
    },
    {
      grade: 'B',
      title: 'Good Condition',
      description: 'Minor scratches or scuffs that are barely noticeable.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-700'
    },
    {
      grade: 'C',
      title: 'Fair Condition',
      description: 'Visible scratches and wear marks but fully functional.',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 border-yellow-200',
      textColor: 'text-yellow-700'
    },
    {
      grade: 'D',
      title: 'Poor Condition',
      description: 'Cracked screen, damaged back, or significant wear.',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50 border-red-200',
      textColor: 'text-red-700'
    }
  ];

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade.grade);

    const match = pricingData.find(item =>
      item.brand?.toLowerCase() === phoneData.brand?.toLowerCase() &&
      item.model?.toLowerCase() === phoneData.model?.toLowerCase() &&
      item.storage?.toLowerCase() === phoneData.storage?.toLowerCase()
    );

    if (!match) {
      alert("No matching price found for selected device.");
      return;
    }

    let priceForGrade = 0;
    switch (grade.grade) {
      case 'A':
        priceForGrade = match.gradeA;
        break;
      case 'B':
        priceForGrade = match.gradeB;
        break;
      case 'C':
        priceForGrade = match.gradeC;
        break;
      case 'D':
        priceForGrade = match.broken;
        break;
      default:
        priceForGrade = 0;
    }

    updatePhoneData({
      cosmeticGrade: grade.grade,
      finalPrice: priceForGrade,
      gradeDetails: grade
    });
  };

  const handleContinue = () => {
    if (selectedGrade) {
      nextStep();
    }
  };

  const getDisplayedPrice = (grade) => {
    const match = pricingData.find(item =>
      item.brand?.toLowerCase() === phoneData.brand?.toLowerCase() &&
      item.model?.toLowerCase() === phoneData.model?.toLowerCase() &&
      item.storage?.toLowerCase() === phoneData.storage?.toLowerCase()
    );

    if (!match) return 'N/A';

    switch (grade.grade) {
      case 'A': return `$${match.gradeA}`;
      case 'B': return `$${match.gradeB}`;
      case 'C': return `$${match.gradeC}`;
      case 'D': return `$${match.broken}`;
      default: return 'N/A';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Cosmetic Grade Assessment</h2>
        <p className="text-gray-600">Select the condition that best describes your device</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {grades.map((grade) => (
          <Card 
            key={grade.grade}
            className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedGrade === grade.grade 
                ? `${grade.bgColor} border-2 scale-105 shadow-lg` 
                : 'hover:scale-102'
            }`}
            onClick={() => handleGradeSelect(grade)}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${grade.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                {grade.grade}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{grade.title}</h3>
                  {selectedGrade === grade.grade && (
                    <Badge className="bg-purple-100 text-purple-800">Selected</Badge>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-3">{grade.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Price Estimate</span>
                  <span className={`font-semibold ${grade.textColor}`}>{getDisplayedPrice(grade)}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedGrade && (
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Assessment Complete</h4>
            <p className="text-gray-600">
              Device graded as <strong>Grade {selectedGrade}</strong> - {grades.find(g => g.grade === selectedGrade)?.title}
            </p>
            {phoneData.finalPrice && (
              <p className="text-2xl font-bold text-purple-600 mt-2">
                Estimated Value: ${phoneData.finalPrice}
              </p>
            )}
          </div>
        </Card>
      )}

      <div className="flex justify-between pt-6">
        <Button onClick={prevStep} variant="outline" className="px-6 py-2">
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedGrade}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-2"
        >
          Review Offer
        </Button>
      </div>
    </div>
  );
};

export default CosmeticGrade;
