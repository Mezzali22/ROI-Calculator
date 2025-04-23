import React from 'react';
import { Link } from 'react-router-dom';

export default function LogisticsPage() {
  return (
    <div className="p-10 max-w-4xl mx-auto text-gray-800 font-sans leading-relaxed">
      <h1 className="text-3xl font-bold mb-6 text-center">Calculation Logistics</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold">1. Subscription Revenue</h2>
          <ul className="list-disc pl-5 mt-2">
            <li>EMEA = Total Viewers × 0.35 → V2F → F2S</li>
            <li>APAC = Total Viewers × 0.45 → V2F → F2S</li>
            <li>Americas = Total Viewers × 0.20 → V2F → F2S</li>
            <li>Total Subscribers = Sum of F2S</li>
            <li>Subscription Revenue = Subscribers × ARPU × 6 years</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Advertising Revenue Uplift</h2>
          <ul className="list-disc pl-5 mt-2">
            <li>Winter Uplift + Summer Uplift → % multiplier</li>
            <li>Revenue = Revenue × (1 + total uplift / 100)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. ROI Calculation</h2>
          <ul className="list-disc pl-5 mt-2">
            <li>Investment = Total Partnership Fee</li>
            <li>ROI = ((Total Revenue - Investment) / Investment) × 100</li>
          </ul>
        </section>

        <div className="pt-4">
          <Link to="/" className="text-purple-700 underline">← Back to ROI Calculator</Link>
        </div>
      </div>
    </div>
  );
}
