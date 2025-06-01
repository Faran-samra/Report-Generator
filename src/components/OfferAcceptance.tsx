
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Receipt from '@/components/Receipt';
import { CheckCircle2, XCircle, Smartphone, Calendar, Barcode } from 'lucide-react';

const OfferAcceptance = ({ phoneData, updatePhoneData, prevStep }) => {
  const [offerAccepted, setOfferAccepted] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const generateReceiptData = () => {
    const receiptNumber = `RC${Date.now().toString().slice(-8)}`;
    const barcode = `*${receiptNumber}*`;
    
    return {
      receiptNumber,
      barcode,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      customerInfo: {
        phone: phoneData.phoneNumber,
        imei: phoneData.imei
      },
      deviceInfo: {
        brand: phoneData.brand,
        model: phoneData.model,
        storage: phoneData.storage,
        grade: phoneData.cosmeticGrade,
        batteryHealth: phoneData.batteryHealth
      },
      diagnosticSummary: {
        overallHealth: phoneData.diagnosticResults?.overallHealth,
        issuesFound: phoneData.diagnosticResults?.issues?.length || 0
      },
      pricing: {
        baseValue: phoneData.diagnosticResults?.estimatedValue || 300,
        gradeMultiplier: phoneData.gradeDetails?.priceMultiplier || 1,
        finalOffer: phoneData.finalPrice
      }
    };
  };

  const handleAcceptOffer = () => {
    setOfferAccepted(true);
    const receipt = generateReceiptData();
    setReceiptData(receipt);
    
    // Store data (in real app, this would go to Google Sheets)
    console.log('Storing phone evaluation data:', {
      ...phoneData,
      offerAccepted: true,
      receipt: receipt,
      timestamp: new Date().toISOString()
    });
    
    setTimeout(() => {
      setShowReceipt(true);
    }, 1500);
  };

  const handleDeclineOffer = () => {
    setOfferAccepted(false);
    console.log('Offer declined for device:', phoneData.imei);
  };

  if (showReceipt && receiptData) {
    return <Receipt receiptData={receiptData} phoneData={phoneData} />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Offer Review</h2>
        <p className="text-gray-600">Review your device evaluation and final offer</p>
      </div>

      {/* Device Summary */}
      <Card className="p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-lg">
            <Smartphone className="h-8 w-8 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800">
              {phoneData.brand} {phoneData.model}
            </h3>
            <p className="text-gray-600">{phoneData.storage} • IMEI: {phoneData.imei}</p>
            <div className="flex items-center space-x-3 mt-2">
              <Badge variant="secondary">Grade {phoneData.cosmeticGrade}</Badge>
              <Badge variant="outline">Battery: {phoneData.batteryHealth}</Badge>
              <Badge variant="outline">Health: {phoneData.diagnosticResults?.overallHealth}%</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Pricing Breakdown */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Pricing Breakdown</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Base device value:</span>
            <span className="font-medium">${phoneData.diagnosticResults?.estimatedValue || 300}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cosmetic grade adjustment:</span>
            <span className="font-medium">
              {phoneData.gradeDetails?.priceMultiplier === 1.0 ? 'No adjustment' : 
               `${Math.round((1 - phoneData.gradeDetails?.priceMultiplier) * 100)}% reduction`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Diagnostic findings:</span>
            <span className="font-medium">
              {phoneData.diagnosticResults?.issues?.length || 0} issues detected
            </span>
          </div>
          <Separator />
          <div className="flex justify-between text-xl font-bold text-purple-600">
            <span>Final Offer:</span>
            <span>${phoneData.finalPrice}</span>
          </div>
        </div>
      </Card>

      {/* Offer Status */}
      {offerAccepted === null && (
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="text-center space-y-4">
            <h4 className="text-xl font-semibold text-gray-800">
              Do you accept this offer?
            </h4>
            <p className="text-gray-600">
              This offer is valid for the next 24 hours and includes free device data wiping.
            </p>
            
            <div className="flex justify-center space-x-4 pt-4">
              <Button
                onClick={handleDeclineOffer}
                variant="outline"
                className="px-8 py-3 border-red-300 text-red-600 hover:bg-red-50"
              >
                <XCircle className="h-5 w-5 mr-2" />
                Decline Offer
              </Button>
              <Button
                onClick={handleAcceptOffer}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3"
              >
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Accept Offer
              </Button>
            </div>
          </div>
        </Card>
      )}

      {offerAccepted === true && !showReceipt && (
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="text-xl font-semibold text-green-800">Offer Accepted!</h4>
            <p className="text-green-700">
              Processing your device evaluation... Your receipt will be generated shortly.
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
              <span className="text-sm text-green-600">Generating receipt...</span>
            </div>
          </div>
        </Card>
      )}

      {offerAccepted === false && (
        <Card className="p-6 bg-red-50 border-red-200">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <h4 className="text-xl font-semibold text-red-800">Offer Declined</h4>
            <p className="text-red-700">
              Thank you for using ReCell AI Diagnostics. Feel free to return if you change your mind.
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="mt-4"
            >
              Start New Evaluation
            </Button>
          </div>
        </Card>
      )}

      {offerAccepted === null && (
        <div className="flex justify-between pt-6">
          <Button 
            onClick={prevStep}
            variant="outline"
            className="px-6 py-2"
          >
            Back to Grading
          </Button>
          <div className="text-sm text-gray-500 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Offer expires in 24 hours
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferAcceptance;
