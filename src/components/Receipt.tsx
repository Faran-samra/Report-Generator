
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Printer, Download, RotateCcw } from 'lucide-react';

const Receipt = ({ receiptData, phoneData }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create receipt content for download
    const content = `
RECELL AI DIAGNOSTICS
Advanced Mobile Device Analysis & Evaluation
=====================================

Receipt #: ${receiptData.receiptNumber}
Date: ${receiptData.date}
Time: ${receiptData.time}

DEVICE INFORMATION
Brand: ${phoneData.brand}
Model: ${phoneData.model}
Storage: ${phoneData.storage}
IMEI: ${phoneData.imei}
Battery Health: ${phoneData.batteryHealth}

DIAGNOSTIC RESULTS
Overall Health: ${receiptData.diagnosticSummary.overallHealth}%
Issues Found: ${receiptData.diagnosticSummary.issuesFound}
Cosmetic Grade: ${phoneData.cosmeticGrade}

PRICING
Base Value: $${receiptData.pricing.baseValue}
Grade Adjustment: ${receiptData.pricing.gradeMultiplier}x
Final Offer: $${receiptData.pricing.finalOffer}

Thank you for choosing ReCell AI Diagnostics!
Scan the barcode below for special discounts:
${receiptData.barcode}
=====================================
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt_${receiptData.receiptNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleNewEvaluation = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Transaction Complete</h2>
        <p className="text-gray-600">Your device evaluation receipt</p>
      </div>

      {/* Receipt Card */}
      <Card className="max-w-md mx-auto bg-white shadow-lg print:shadow-none print:border-none">
        <div className="p-6 space-y-4 text-sm">
          {/* Header */}
          <div className="text-center border-b pb-4">
            <h3 className="font-bold text-lg text-purple-600">RECELL AI DIAGNOSTICS</h3>
            <p className="text-xs text-gray-600 mt-1">Advanced Mobile Device Analysis & Evaluation</p>
            <div className="text-xs text-gray-500 mt-2">
              <p>Receipt #: {receiptData.receiptNumber}</p>
              <p>{receiptData.date} • {receiptData.time}</p>
            </div>
          </div>

          {/* Device Information */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">DEVICE INFORMATION</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Brand:</span>
                <span>{phoneData.brand}</span>
              </div>
              <div className="flex justify-between">
                <span>Model:</span>
                <span>{phoneData.model}</span>
              </div>
              <div className="flex justify-between">
                <span>Storage:</span>
                <span>{phoneData.storage}</span>
              </div>
              <div className="flex justify-between">
                <span>IMEI:</span>
                <span className="font-mono">{phoneData.imei}</span>
              </div>
              <div className="flex justify-between">
                <span>Battery Health:</span>
                <span>{phoneData.batteryHealth}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Diagnostic Results */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">DIAGNOSTIC RESULTS</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Overall Health:</span>
                <span className="font-semibold text-green-600">{receiptData.diagnosticSummary.overallHealth}%</span>
              </div>
              <div className="flex justify-between">
                <span>Issues Found:</span>
                <span>{receiptData.diagnosticSummary.issuesFound}</span>
              </div>
              <div className="flex justify-between">
                <span>Cosmetic Grade:</span>
                <span className="font-semibold">Grade {phoneData.cosmeticGrade}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Pricing */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">PRICING</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Base Value:</span>
                <span>${receiptData.pricing.baseValue}</span>
              </div>
              <div className="flex justify-between">
                <span>Grade Adjustment:</span>
                <span>{receiptData.pricing.gradeMultiplier}x</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-base text-purple-600">
                <span>FINAL OFFER:</span>
                <span>${receiptData.pricing.finalOffer}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Barcode */}
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-2">Scan for special discounts:</p>
            <div className="bg-black text-white font-mono text-lg py-2 px-4 inline-block">
              {receiptData.barcode}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 border-t pt-4">
            <p>Thank you for choosing ReCell AI Diagnostics!</p>
            <p className="mt-1">Visit us again for all your device needs.</p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 print:hidden">
        <Button
          onClick={handlePrint}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Printer className="h-4 w-4" />
          <span>Print Receipt</span>
        </Button>
        <Button
          onClick={handleDownload}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Download</span>
        </Button>
        <Button
          onClick={handleNewEvaluation}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center space-x-2"
        >
          <RotateCcw className="h-4 w-4" />
          <span>New Evaluation</span>
        </Button>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Receipt saved to system • Evaluation ID: {receiptData.receiptNumber}</p>
      </div>
    </div>
  );
};

export default Receipt;
