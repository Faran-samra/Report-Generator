
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Smartphone, Wifi, Bluetooth, Usb } from 'lucide-react';

interface ConnectPhoneProps {
  nextStep: () => void;
}

const ConnectPhone: React.FC<ConnectPhoneProps> = ({ nextStep }) => {
  const handleConnect = () => {
    // Simulate connection process
    setTimeout(() => {
      nextStep();
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Connect Your Device</h2>
      </div>

      <div className="grid md:grid-cols-1 gap-6">
       

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <Usb className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">USB Connection</h3>
            <p className="text-gray-600">Connect via USB for comprehensive analysis</p>
            <Button
              onClick={handleConnect}
              variant="outline"
              className="w-full border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              Connect via USB
            </Button>
          </div>
        </Card>
      </div>

      <Card className="bg-yellow-50 border-yellow-200 p-4">
        <div className="flex items-center space-x-3">
          <Smartphone className="h-5 w-5 text-yellow-600" />
          <div className="text-sm text-yellow-800">
            <strong>Tip:</strong> Make sure your device is unlocked and USB debugging is enabled for the most accurate diagnostics.
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ConnectPhone;
