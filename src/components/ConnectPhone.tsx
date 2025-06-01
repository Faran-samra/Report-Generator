
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Smartphone, Usb, Zap } from 'lucide-react';

const ConnectPhone = ({ nextStep }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleStartConnection = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setTimeout(() => {
        nextStep();
      }, 1500);
    }, 3000);
  };

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Step 1: Connect Phone</h2>
        <p className="text-gray-600 text-lg">Connect your device using a USB cable to begin the diagnostic process</p>
      </div>

      <div className="flex justify-center">
        <div className={`relative transition-all duration-1000 ${isConnecting ? 'animate-pulse' : ''}`}>
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-12 rounded-2xl border-2 border-dashed border-purple-300">
            <div className="flex items-center justify-center space-x-6">
              <Smartphone className={`h-20 w-20 transition-colors duration-500 ${
                isConnected ? 'text-green-500' : isConnecting ? 'text-purple-500' : 'text-gray-400'
              }`} />
              <div className="flex items-center space-x-2">
                <div className={`h-1 w-8 rounded transition-colors duration-500 ${
                  isConnected ? 'bg-green-500' : isConnecting ? 'bg-purple-500 animate-pulse' : 'bg-gray-300'
                }`} />
                <Usb className={`h-8 w-8 transition-colors duration-500 ${
                  isConnected ? 'text-green-500' : isConnecting ? 'text-purple-500' : 'text-gray-400'
                }`} />
                <div className={`h-1 w-8 rounded transition-colors duration-500 ${
                  isConnected ? 'bg-green-500' : isConnecting ? 'bg-purple-500 animate-pulse' : 'bg-gray-300'
                }`} />
              </div>
              <div className={`p-4 rounded-lg transition-colors duration-500 ${
                isConnected ? 'bg-green-100' : isConnecting ? 'bg-purple-100' : 'bg-gray-100'
              }`}>
                <div className="text-sm font-medium">USB Port</div>
              </div>
            </div>
            
            {isConnecting && (
              <div className="mt-6">
                <div className="flex items-center justify-center space-x-2">
                  <Zap className="h-5 w-5 text-purple-500 animate-bounce" />
                  <span className="text-purple-600 font-medium">Establishing Connection...</span>
                </div>
              </div>
            )}
            
            {isConnected && (
              <div className="mt-6">
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-600 font-medium">Connected Successfully!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {!isConnecting && !isConnected && (
          <Button
            onClick={handleStartConnection}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Start Connection
          </Button>
        )}
        
        {isConnecting && (
          <div className="text-gray-500">
            Please wait while we establish a secure connection with your device...
          </div>
        )}
      </div>

      <Card className="bg-blue-50 border-blue-200 p-4">
        <div className="text-sm text-blue-800">
          <strong>Note:</strong> Make sure your device is unlocked and USB debugging is enabled for Android devices.
        </div>
      </Card>
    </div>
  );
};

export default ConnectPhone;
