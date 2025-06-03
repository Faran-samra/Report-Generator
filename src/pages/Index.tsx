
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ConnectPhone from '@/components/ConnectPhone';
import PhoneDetails from '@/components/PhoneDetails';
import DiagnosticScan from '@/components/DiagnosticScan';
import CosmeticGrade from '@/components/CosmeticGrade';
import OfferAcceptance from '@/components/OfferAcceptance';
import PricingUpload from '@/components/PricingUpload';
import AuthPage from '@/components/AuthPage';
import UserMenu from '@/components/UserMenu';
import { useAuth } from '@/hooks/useAuth';
import { useDiagnosticSession } from '@/hooks/useDiagnosticSession';
import { Smartphone, Zap, Upload } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, loading } = useAuth();
  const { saveDiagnosticSession, generateReceiptNumber } = useDiagnosticSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState('diagnostic');
  const [phoneData, setPhoneData] = useState({
    brand: '',
    model: '',
    storage: '',
    imei: '',
    phoneNumber: '',
    batteryHealth: '',
    cosmeticGrade: '',
    diagnosticResults: null,
    finalPrice: 0
  });

  const steps = [
    { id: 1, title: 'Connect Phone', component: ConnectPhone },
    { id: 2, title: 'Phone Details', component: PhoneDetails },
    { id: 3, title: 'Diagnostic Scan', component: DiagnosticScan },
    { id: 4, title: 'Cosmetic Grade', component: CosmeticGrade },
    { id: 5, title: 'Offer Review', component: OfferAcceptance }
  ];

  const progress = (currentStep / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updatePhoneData = async (newData) => {
    const updatedData = { ...phoneData, ...newData };
    setPhoneData(updatedData);
    
    // Save to database when we have enough data (after phone details step)
    if (currentStep === 2 && newData.brand && newData.model) {
      console.log('Saving diagnostic session to database...');
      await saveDiagnosticSession(updatedData);
    }
  };

  const handleAuthSuccess = () => {
    // Reset the flow when user logs in
    setCurrentStep(1);
    setActiveTab('diagnostic');
    setPhoneData({
      brand: '',
      model: '',
      storage: '',
      imei: '',
      phoneNumber: '',
      batteryHealth: '',
      cosmeticGrade: '',
      diagnosticResults: null,
      finalPrice: 0
    });
  };

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-red-500 flex items-center justify-center">
        <div className="text-white text-center">
          <Zap className="h-12 w-12 animate-pulse mx-auto mb-4" />
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-red-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-red-500 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="h-8 w-8 text-yellow-300" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  ReCell AI Diagnostics
                </h1>
                <p className="text-lg text-pink-100">
                  Advanced Mobile Device Analysis & Evaluation
                </p>
              </div>
              <Zap className="h-8 w-8 text-yellow-300" />
            </div>
            <UserMenu />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-4 py-4">
            <div 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'diagnostic' ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setActiveTab('diagnostic')}
            >
              <Smartphone className="h-5 w-5" />
              <span className="hidden sm:inline">Phone Diagnostic</span>
            </div>
            <div 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'pricing' ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setActiveTab('pricing')}
            >
              <Upload className="h-5 w-5" />
              <span className="hidden sm:inline">Pricing Management</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 cursor-not-allowed">
              <span className="h-5 w-5 rounded bg-white/20 flex items-center justify-center text-xs">📊</span>
              <span className="hidden sm:inline">Diagnostic History</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 cursor-not-allowed">
              <span className="h-5 w-5 rounded bg-white/20 flex items-center justify-center text-xs">⚙️</span>
              <span className="hidden sm:inline">Admin Panel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'pricing' ? (
        <div className="container mx-auto px-4 py-8">
          <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0">
            <div className="p-6 md:p-8">
              <PricingUpload />
            </div>
          </Card>
        </div>
      ) : (
        <>
          {/* Progress Steps */}
          <div className="bg-white/5 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      currentStep >= step.id 
                        ? 'bg-purple-600 text-white shadow-lg' 
                        : 'bg-white/20 text-white/60'
                    }`}>
                      {step.id}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`h-1 w-16 mx-2 rounded transition-all ${
                        currentStep > step.id ? 'bg-purple-600' : 'bg-white/20'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <Progress value={progress} className="h-2 bg-white/20" />
              <p className="text-white text-center mt-2 font-medium">
                Step {currentStep}: {steps[currentStep - 1].title}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0">
              <div className="p-6 md:p-8">
                <CurrentStepComponent
                  phoneData={phoneData}
                  updatePhoneData={updatePhoneData}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  currentStep={currentStep}
                  totalSteps={steps.length}
                />
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
