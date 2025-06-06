
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, FileSpreadsheet, Check, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { parseExcelData } from '@/utils/pricingUtils';

interface PricingData {
  brand: string;
  model: string;
  storage: string;
  gradeA: number;
  gradeB: number;
  gradeC: number;
  broken: number;
}

const PricingUpload = () => {
  const [uploadedData, setUploadedData] = useState<PricingData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Process the Excel data using the new parser
        const processedData = parseExcelData(jsonData);

        setUploadedData(processedData);
        
        // Store in localStorage
        localStorage.setItem('devicePricing', JSON.stringify(processedData));
        
        setSuccess(true);
        console.log('Pricing data uploaded:', processedData);
      } catch (err) {
        setError('Error processing Excel file. Please check the format.');
        console.error('Excel processing error:', err);
      } finally {
        setUploading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const downloadTemplate = () => {
    const templateData = [
      { Make: 'Apple', Model: 'iPhone 16 Pro', MemorySize: '128GB', GradeA: 2800, GradeB: 2520, GradeC: 2268, Broken: 907.2 },
      { Make: 'Apple', Model: 'iPhone 15 Pro', MemorySize: '256GB', GradeA: 1800, GradeB: 1620, GradeC: 1458, Broken: 583.2 },
      { Make: 'Samsung', Model: 'Galaxy S24', MemorySize: '128GB', GradeA: 800, GradeB: 720, GradeC: 648, Broken: 259.2 },
      { Make: 'Google', Model: 'Pixel 9 Pro', MemorySize: '256GB', GradeA: 70, GradeB: 63, GradeC: 56.7, Broken: 22.68 }
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pricing Template');
    XLSX.writeFile(workbook, 'device_pricing_template.xlsx');
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Pricing Management</h2>
        <p className="text-gray-600">Upload Excel file to update device pricing with grade-based values</p>
      </div>

      {/* Template Download */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-blue-800">Need a template?</h4>
            <p className="text-sm text-blue-600">Download our Excel template with Make, Model, MemorySize, GradeA, GradeB, GradeC, Broken columns</p>
          </div>
          <Button 
            onClick={downloadTemplate}
            variant="outline"
            className="border-blue-300 text-blue-600 hover:bg-blue-100"
          >
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Download Template
          </Button>
        </div>
      </Card>

      {/* File Upload */}
      <Card className="p-6">
        <div className="text-center space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-purple-400 transition-colors">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              id="excel-upload"
              disabled={uploading}
            />
            <label htmlFor="excel-upload" className="cursor-pointer">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                {uploading ? 'Processing...' : 'Upload Excel File'}
              </p>
              <p className="text-sm text-gray-500">
                Click to select your Excel file (.xlsx, .xls)
              </p>
            </label>
          </div>

          {uploading && (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
              <span className="text-sm text-gray-600">Processing Excel file...</span>
            </div>
          )}
        </div>
      </Card>

      {/* Error Message */}
      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-700">{error}</p>
          </div>
        </Card>
      )}

      {/* Success Message */}
      {success && (
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-green-600" />
            <p className="text-green-700">
              Pricing data uploaded successfully! {uploadedData.length} devices updated.
            </p>
          </div>
        </Card>
      )}

      {/* Preview Data */}
      {uploadedData.length > 0 && (
        <Card className="p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Uploaded Pricing Data ({uploadedData.length} devices)
          </h4>
          <div className="max-h-64 overflow-y-auto">
            <div className="grid gap-2">
              {uploadedData.slice(0, 10).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">{item.brand} {item.model}</span>
                    <Badge variant="secondary" className="ml-2">{item.storage}</Badge>
                  </div>
                  <div className="text-sm">
                    <span className="text-green-600 font-bold">A: {item.gradeA}</span>
                    <span className="text-yellow-600 font-bold ml-2">B: {item.gradeB}</span>
                    <span className="text-orange-600 font-bold ml-2">C: {item.gradeC}</span>
                  </div>
                </div>
              ))}
              {uploadedData.length > 10 && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  ... and {uploadedData.length - 10} more devices
                </p>
              )}
            </div>
          </div>
        </Card>
      )}

      <div className="text-center">
        <p className="text-sm text-gray-500">
          Expected columns: Make, Model, MemorySize, GradeA, GradeB, GradeC, Broken
        </p>
      </div>
    </div>
  );
};

export default PricingUpload;
