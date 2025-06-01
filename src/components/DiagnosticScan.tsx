
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Smartphone, Search, Cpu, Camera, Volume2, Wifi, Battery, AlertTriangle } from 'lucide-react';

const DiagnosticScan = ({ phoneData, updatePhoneData, nextStep, prevStep }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTest, setCurrentTest] = useState('');
  const [scanComplete, setScanComplete] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState(null);

  const tests = [
    { name: 'Hardware Analysis', icon: Cpu, duration: 3 },
    { name: 'Camera System', icon: Camera, duration: 2 },
    { name: 'Audio Components', icon: Volume2, duration: 2 },
    { name: 'Connectivity Tests', icon: Wifi, duration: 3 },
    { name: 'Battery Analysis', icon: Battery, duration: 2 },
    { name: 'Motherboard Scan', icon: Smartphone, duration: 4 }
  ];

  const generateRandomError = () => {
    const errors = [
      {
        component: 'Camera Module',
        severity: 'Warning',
        message: 'Slight focus calibration drift detected - may affect macro photography',
        impact: 'Minor'
      },
      {
        component: 'Charging Port',
        severity: 'Info',
        message: 'Minimal dust accumulation detected in charging port',
        impact: 'None'
      },
      {
        component: 'Speaker Grille',
        severity: 'Warning', 
        message: 'Small debris particles found in speaker housing',
        impact: 'Minor audio quality reduction'
      },
      {
        component: 'Battery',
        severity: 'Info',
        message: `Battery health at ${phoneData.batteryHealth} - within normal range for device age`,
        impact: 'Normal wear'
      },
      {
        component: 'WiFi Antenna',
        severity: 'Warning',
        message: 'Signal strength slightly below optimal levels',
        impact: 'May affect connectivity in weak signal areas'
      }
    ];
    
    return errors[Math.floor(Math.random() * errors.length)];
  };

  const startScan = () => {
    setIsScanning(true);
    setProgress(0);
    let currentProgress = 0;
    let testIndex = 0;

    const scanInterval = setInterval(() => {
      if (testIndex < tests.length) {
        setCurrentTest(tests[testIndex].name);
        const testProgress = (100 / tests.length) * (testIndex + 1);
        setProgress(testProgress);
        
        if (currentProgress >= testProgress - 10) {
          testIndex++;
        }
        currentProgress += 2;
      } else {
        clearInterval(scanInterval);
        setTimeout(() => {
          const results = {
            overallHealth: Math.floor(Math.random() * 20) + 75, // 75-95%
            testsRun: tests.length,
            issues: [generateRandomError()],
            scanDate: new Date().toISOString(),
            estimatedValue: Math.floor(Math.random() * 300) + 200 // $200-$500
          };
          
          setDiagnosticResults(results);
          updatePhoneData({ diagnosticResults: results });
          setScanComplete(true);
          setIsScanning(false);
        }, 1000);
      }
    }, 200);
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Warning': return 'text-yellow-600 bg-yellow-100';
      case 'Error': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">AI Diagnostic Scan</h2>
        <p className="text-gray-600">Advanced hardware and software analysis</p>
      </div>

      {!isScanning && !scanComplete && (
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-2xl">
            <div className="relative inline-block">
              <Smartphone className="h-24 w-24 text-purple-600" />
              <Search className="h-8 w-8 text-pink-500 absolute -top-2 -right-2 animate-pulse" />
            </div>
            <p className="mt-4 text-gray-700">Ready to begin comprehensive diagnostic scan</p>
          </div>
          
          <Button
            onClick={startScan}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl"
          >
            Start AI Diagnostic Scan
          </Button>
        </div>
      )}

      {isScanning && (
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <Smartphone className="h-20 w-20 text-purple-600" />
                <div className="absolute inset-0 border-4 border-purple-300 rounded-lg animate-ping opacity-20" />
                <Search className="h-8 w-8 text-pink-500 absolute top-0 left-0 animate-bounce" />
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Scanning in Progress...</h3>
              <p className="text-purple-600 font-medium">{currentTest}</p>
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-gray-600">{Math.round(progress)}% Complete</p>
            </div>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tests.map((test, index) => {
              const TestIcon = test.icon;
              const isActive = currentTest === test.name;
              const isComplete = progress > ((100 / tests.length) * index);
              
              return (
                <Card key={test.name} className={`p-4 transition-all ${
                  isActive ? 'bg-purple-100 border-purple-300 scale-105' : 
                  isComplete ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-2">
                    <TestIcon className={`h-5 w-5 ${
                      isActive ? 'text-purple-600' : 
                      isComplete ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    <span className="text-sm font-medium">{test.name}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {scanComplete && diagnosticResults && (
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <span className="text-2xl font-bold text-green-600">{diagnosticResults.overallHealth}%</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Diagnostic Complete</h3>
              <p className="text-gray-600">Overall device health: {diagnosticResults.overallHealth}%</p>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              Diagnostic Results
            </h4>
            
            {diagnosticResults.issues.map((issue, index) => (
              <div key={index} className={`p-4 rounded-lg mb-3 ${getSeverityColor(issue.severity)}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium">{issue.component}</h5>
                    <p className="text-sm mt-1">{issue.message}</p>
                    <p className="text-xs mt-1 opacity-75">Impact: {issue.impact}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded">
                    {issue.severity}
                  </span>
                </div>
              </div>
            ))}
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
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-2"
            >
              Continue to Grading
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticScan;
