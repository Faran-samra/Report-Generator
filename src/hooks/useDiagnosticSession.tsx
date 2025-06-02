
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const useDiagnosticSession = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveDiagnosticSession = async (phoneData) => {
    if (!user) {
      setError('User must be authenticated');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: saveError } = await supabase
        .from('diagnostic_sessions')
        .insert({
          user_id: user.id,
          phone_brand: phoneData.brand,
          phone_model: phoneData.model,
          phone_storage: phoneData.storage,
          imei: phoneData.imei,
          phone_number: phoneData.phoneNumber,
          battery_health: phoneData.batteryHealth,
          cosmetic_grade: phoneData.cosmeticGrade,
          diagnostic_results: phoneData.diagnosticResults,
          final_price: phoneData.finalPrice
        })
        .select()
        .single();

      if (saveError) {
        console.error('Error saving diagnostic session:', saveError);
        setError(saveError.message);
        return null;
      }

      console.log('Diagnostic session saved successfully:', data);
      return data;
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateReceiptNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `RC-${timestamp}-${random}`;
  };

  return {
    saveDiagnosticSession,
    generateReceiptNumber,
    loading,
    error
  };
};
