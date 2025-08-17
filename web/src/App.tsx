import FrancisTurbineCalculator from "@/components/FrancisTurbineCalculator";
import PeltonWheelCalculator from "@/components/PeltonWheelCalculator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalculatorType } from "@/types/calculator";
import { Calculator, Droplets, Zap } from "lucide-react";
import { useState } from "react";

function App() {
  const [selectedCalculator, setSelectedCalculator] =
    useState<CalculatorType | null>(null);

  const handleCalculatorSelect = (type: CalculatorType) => {
    setSelectedCalculator(type);
  };

  const handleBackToSelection = () => {
    setSelectedCalculator(null);
  };

  return (
    <div className="min-h-screen bg-tokyo-bg text-tokyo-fg">
      {/* Header */}
      <header className="border-b border-tokyo-fg-gutter bg-tokyo-bg-dark">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calculator className="h-8 w-8 text-tokyo-blue" />
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  Hydraulic Turbine Calculator
                </h1>
                <p className="text-sm text-tokyo-comment">
                  Professional turbine calculations made simple
                </p>
              </div>
            </div>
            {selectedCalculator && (
              <Button variant="outline" onClick={handleBackToSelection}>
                ← Back to Selection
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!selectedCalculator ? (
          <CalculatorSelection onSelect={handleCalculatorSelect} />
        ) : selectedCalculator === "francis" ? (
          <FrancisTurbineCalculator />
        ) : (
          <PeltonWheelCalculator />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-tokyo-fg-gutter bg-tokyo-bg-dark mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-tokyo-comment">
          <p>Built with ❤️ using React, TypeScript, and TailwindCSS</p>
        </div>
      </footer>
    </div>
  );
}

interface CalculatorSelectionProps {
  onSelect: (type: CalculatorType) => void;
}

function CalculatorSelection({ onSelect }: CalculatorSelectionProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 gradient-text">
          Choose Your Calculator
        </h2>
        <p className="text-lg text-tokyo-comment max-w-2xl mx-auto">
          Select the type of hydraulic turbine you want to analyze. Each
          calculator provides comprehensive analysis with detailed results and
          visualizations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card
          className="hover:border-tokyo-blue transition-colors duration-300 cursor-pointer group"
          onClick={() => onSelect("francis")}
        >
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-tokyo-blue/10 rounded-full w-fit">
              <Droplets className="h-12 w-12 text-tokyo-blue group-hover:scale-110 transition-transform duration-300" />
            </div>
            <CardTitle className="text-2xl">Francis Turbine</CardTitle>
            <CardDescription className="text-base">
              Reaction turbine for medium to high head applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-tokyo-comment">
              <li>• Head range: 40-600 meters</li>
              <li>• Radial flow design</li>
              <li>• High efficiency calculations</li>
              <li>• Comprehensive velocity analysis</li>
            </ul>
            <Button className="w-full mt-6" onClick={() => onSelect("francis")}>
              Calculate Francis Turbine
            </Button>
          </CardContent>
        </Card>

        <Card
          className="hover:border-tokyo-cyan transition-colors duration-300 cursor-pointer group"
          onClick={() => onSelect("pelton")}
        >
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-tokyo-cyan/10 rounded-full w-fit">
              <Zap className="h-12 w-12 text-tokyo-cyan group-hover:scale-110 transition-transform duration-300" />
            </div>
            <CardTitle className="text-2xl">Pelton Wheel</CardTitle>
            <CardDescription className="text-base">
              Impulse turbine for high head applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-tokyo-comment">
              <li>• Head range: 150-1800 meters</li>
              <li>• Impulse design with jets</li>
              <li>• Multiple jet configurations</li>
              <li>• Bucket and jet optimization</li>
            </ul>
            <Button
              className="w-full mt-6 bg-tokyo-cyan hover:bg-tokyo-blue1"
              onClick={() => onSelect("pelton")}
            >
              Calculate Pelton Wheel
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
