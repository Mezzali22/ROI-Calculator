import React from 'react';
import { Link } from 'react-router-dom';

export default function LogisticsPage() {
  return (
    <div className="p-10 max-w-4xl mx-auto text-gray-800 font-sans leading-relaxed">
      <h1 className="text-3xl font-bold mb-6 text-center">Calculation Logistics</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Subscription Revenue</h2>
          <ul className="list-disc pl-6">
            <li>EMEA = Total Viewers × 0.35 → V2F → F2S</li>
            <li>APAC = Total Viewers × 0.45 → V2F → F2S</li>
            <li>Americas = Total Viewers × 0.2 → V2F → F2S</li>
            <li>Total = Sum of F2S × ARPU × 6 years</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Advertising Revenue</h2>
          <ul className="list-disc pl-6">
            <li>Converted users × ARPU uplift rate</li>
            <li>Uplift includes seasonal boost (Winter + Summer)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Investment</h2>
          <ul className="list-disc pl-6">
            <li>Total investment = Partnership Fee</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. ROI Calculation</h2>
          <ul className="list-disc pl-6">
            <li>ROI = ((Revenue - Fee) / Fee) × 100</li>
          </ul>
        </section>

        <Link to="/" className="text-purple-700 underline">← Back to ROI Calculator</Link>
      </div>
    </div>
  );
}
