import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Droplets } from 'lucide-react';
import { FrancisTurbineInputs, CalculatorResult } from '@/types/calculator';

const FrancisTurbineCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<FrancisTurbineInputs>({
    ppg: 0,
    npg: 0,
    w1: 0,
    w2: 0,
    rpm: 0,
  });

  const [results, setResults] = useState<CalculatorResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof FrancisTurbineInputs, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const calculateFrancisTurbineResults = async () => {
    setIsCalculating(true);

    // Simulate calculation with mock results for now
    setTimeout(() => {
      const mockResults: CalculatorResult = {
        "Available Head (m)": (inputs.ppg + inputs.npg + 10).toFixed(3),
        "Unit Speed (rpm/√m)": (inputs.rpm / 10).toFixed(3),
        "Unit Discharge (m³/s/√m)": "0.025",
        "Unit Torque (Nm/m)": ((inputs.w1 - inputs.w2) * 2).toFixed(3),
        "Unit Power (W/m^1.5)": (
          inputs.rpm *
          (inputs.w1 - inputs.w2) *
          0.1
        ).toFixed(3),
        "Available Power (W)": (
          inputs.rpm *
          (inputs.w1 - inputs.w2) *
          10
        ).toFixed(2),
        "Efficiency (%)": "85.2",
      };
      
      setResults(mockResults);
      setIsCalculating(false);
    }, 1000);
  };

  const inputFields = [
    {
      key: "ppg",
      label: "Positive Pressure Gauge Reading",
      unit: "bar",
      description: "Positive pressure gauge reading",
    },
    {
      key: "npg",
      label: "Negative Pressure Gauge Reading",
      unit: "bar",
      description: "Negative pressure gauge reading",
    },
    {
      key: "w1",
      label: "Weight 1 (w₁)",
      unit: "kg",
      description: "First weight measurement",
    },
    {
      key: "w2",
      label: "Weight 2 (w₂)",
      unit: "kg",
      description: "Second weight measurement",
    },
    {
      key: "rpm",
      label: "Speed (N)",
      unit: "rpm",
      description: "Rotational speed in revolutions per minute",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-tokyo-blue/10 rounded-full mr-4">
            <Droplets className="h-8 w-8 text-tokyo-blue" />
          </div>
          <h2 className="text-3xl font-bold gradient-text">Francis Turbine Calculator</h2>
        </div>
        <p className="text-tokyo-comment max-w-2xl mx-auto">
          Enter the parameters for your Francis turbine to calculate power output, efficiency, 
          and other performance characteristics.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="h-5 w-5 mr-2 text-tokyo-blue" />
              Input Parameters
            </CardTitle>
            <CardDescription>
              Enter the design and operating parameters for the Francis turbine
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              {inputFields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key} className="text-sm font-medium">
                    {field.label}
                    <span className="text-tokyo-comment ml-1">({field.unit})</span>
                  </Label>
                  <Input
                    id={field.key}
                    type="number"
                    step="any"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    value={inputs[field.key as keyof FrancisTurbineInputs] || ''}
                    onChange={(e) => handleInputChange(field.key as keyof FrancisTurbineInputs, e.target.value)}
                    className="input-field"
                  />
                  <p className="text-xs text-tokyo-comment">{field.description}</p>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={calculateFrancisTurbineResults}
              disabled={isCalculating}
              className="w-full mt-6"
            >
              {isCalculating ? 'Calculating...' : 'Calculate Performance'}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-tokyo-green">Calculation Results</CardTitle>
            <CardDescription>
              Performance characteristics and design parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-4">
                {Object.entries(results).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-tokyo-bg rounded-lg border border-tokyo-fg-gutter">
                    <span className="text-tokyo-fg font-medium">{key}</span>
                    <span className="text-tokyo-cyan font-mono text-lg">{value}</span>
                  </div>
                ))}
                
                <div className="mt-6 p-4 bg-tokyo-blue/10 rounded-lg border border-tokyo-blue/20">
                  <h4 className="font-semibold text-tokyo-blue mb-2">Performance Summary</h4>
                  <p className="text-sm text-tokyo-comment">
                    The Francis turbine shows good performance characteristics for the given parameters. 
                    Consider optimizing the guide vane angles and runner dimensions for maximum efficiency.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="h-12 w-12 text-tokyo-comment mx-auto mb-4" />
                <p className="text-tokyo-comment">
                  Enter parameters and click "Calculate Performance" to see results
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FrancisTurbineCalculator;
