
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { getDevicePrice } from '@/utils/pricingUtils';
import { 
  Search, 
  Cpu, 
  Camera, 
  Volume2, 
  Wifi, 
  Battery, 
  Smartphone,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

const DiagnosticScan = ({ phoneData, updatePhoneData, nextStep, prevStep }) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [currentTest, setCurrentTest] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState(null);

  const tests = [
    { name: 'Hardware Components', icon: Cpu, duration: 3000 },
    { name: 'Camera System', icon: Camera, duration: 2500 },
    { name: 'Audio Testing', icon: Volume2, duration: 2000 },
    { name: 'Network Connectivity', icon: Wifi, duration: 3500 },
    { name: 'Battery Analysis', icon: Battery, duration: 4000 },
    { name: 'System Integration', icon: Smartphone, duration: 5000 }
  ];

  const startDiagnostic = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanComplete(false);
    
    let totalDuration = 0;
    let progressStep = 0;

    tests.forEach((test, index) => {
      setTimeout(() => {
        setCurrentTest(test.name);
        progressStep += 100 / tests.length;
        setScanProgress(Math.min(progressStep, 100));
        
        if (index === tests.length - 1) {
          setTimeout(() => {
            completeDiagnostic();
          }, test.duration);
        }
      }, totalDuration);
      
      totalDuration += test.duration;
    });
  };

  const completeDiagnostic = () => {
    // Get dynamic pricing based on uploaded data or defaults
    const basePrice = getDevicePrice(phoneData.brand, phoneData.model, phoneData.storage);
    
    // Generate realistic diagnostic results
    const issues = [];
    const batteryHealthNum = parseInt(phoneData.batteryHealth) || 85;
    
    if (batteryHealthNum < 80) {
      issues.push({ component: 'Battery', severity: 'medium', description: 'Battery health below optimal' });
    }
    
    // Random issues for demonstration
    if (Math.random() > 0.7) {
      issues.push({ component: 'Camera', severity: 'low', description: 'Minor autofocus calibration needed' });
    }
    
    if (Math.random() > 0.8) {
      issues.push({ component: 'Speaker', severity: 'low', description: 'Audio output slightly below standard' });
    }

    const overallHealth = Math.max(75, 100 - (issues.length * 5) - (100 - batteryHealthNum) / 2);
    
    const results = {
      overallHealth: Math.round(overallHealth),
      issues: issues,
      testsCompleted: tests.length,
      estimatedValue: basePrice,
      timestamp: new Date().toISOString()
    };

    setDiagnosticResults(results);
    updatePhoneData({ 
      diagnosticResults: results,
      finalPrice: basePrice // This will be adjusted by cosmetic grade later
    });
    
    setIsScanning(false);
    setScanComplete(true);
    setCurrentTest('Diagnostic Complete');
    setScanProgress(100);
  };

  const handleContinue = () => {
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">AI Diagnostic Scan</h2>
        <p className="text-gray-600">Advanced hardware analysis in progress</p>
      </div>

      {/* Device Info Summary */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-lg">
            <Smartphone className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">
              {phoneData.brand} {phoneData.model}
            </h4>
            <p className="text-sm text-gray-600">
              {phoneData.storage} • Battery: {phoneData.batteryHealth} • IMEI: {phoneData.imei}
            </p>
          </div>
        </div>
      </Card>

      {/* Scanning Interface */}
      <Card className="p-8">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className={`w-32 h-32 mx-auto rounded-full border-4 ${
              isScanning ? 'border-purple-200 animate-pulse' : 'border-gray-200'
            } flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50`}>
              <Search className={`h-16 w-16 text-purple-600 ${
                isScanning ? 'animate-pulse' : ''
              }`} />
            </div>
            
            {isScanning && (
              <div className="absolute inset-0 rounded-full border-4 border-purple-600 animate-ping opacity-20"></div>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {scanComplete ? 'Diagnostic Complete' : currentTest || 'Ready to scan'}
                </span>
                <span className="font-medium">{Math.round(scanProgress)}%</span>
              </div>
              <Progress 
                value={scanProgress} 
                className="h-2"
              />
            </div>

            {!isScanning && !scanComplete && (
              <Button
                onClick={startDiagnostic}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
              >
                <Search className="h-5 w-5 mr-2" />
                Start Diagnostic Scan
              </Button>
            )}

            {isScanning && (
              <div className="space-y-3">
                <p className="text-gray-600">
                  Analyzing {currentTest}...
                </p>
                <div className="flex justify-center space-x-4">
                  {tests.map((test, index) => {
                    const TestIcon = test.icon;
                    const isActive = currentTest === test.name;
                    const isCompleted = tests.findIndex(t => t.name === currentTest) > index;
                    
                    return (
                      <div
                        key={test.name}
                        className={`p-2 rounded-lg transition-all ${
                          isActive 
                            ? 'bg-purple-600 text-white scale-110' 
                            : isCompleted 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <TestIcon className="h-5 w-5" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Diagnostic Results */}
      {scanComplete && diagnosticResults && (
        <Card className="p-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Diagnostic Results</h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Overall Health Score:</span>
                <Badge 
                  variant={diagnosticResults.overallHealth >= 90 ? "default" : 
                          diagnosticResults.overallHealth >= 70 ? "secondary" : "destructive"}
                  className="text-lg px-3 py-1"
                >
                  {diagnosticResults.overallHealth}%
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tests Completed:</span>
                <span className="font-medium">{diagnosticResults.testsCompleted}/{tests.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Estimated Base Value:</span>
                <span className="font-bold text-purple-600 text-xl">
                  ${diagnosticResults.estimatedValue}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-semibold text-gray-800">Issues Detected:</h5>
              {diagnosticResults.issues.length === 0 ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>No issues detected</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {diagnosticResults.issues.map((issue, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-yellow-50 rounded">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">
                          {issue.component}
                        </p>
                        <p className="text-xs text-yellow-600">
                          {issue.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-between pt-6">
        <Button 
          onClick={prevStep}
          variant="outline"
          className="px-6 py-2"
        >
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!scanComplete}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-2"
        >
          Continue to Grading
        </Button>
      </div>
    </div>
  );
};

export default DiagnosticScan;
