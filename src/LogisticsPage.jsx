export default function LogisticsPage() {
    return (
      <div className="p-10 max-w-4xl mx-auto text-gray-800 font-sans leading-relaxed">
        <h1 className="text-3xl font-bold mb-6 text-center">Calculation Logistics</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Subscription Revenue</h2>
            <ul className="list-disc list-inside">
              <li>Viewers split: 35% EMEA, 45% APAC, 20% Americas</li>
              <li>EMEA: viewers × V2F × F2S</li>
              <li>APAC: viewers × V2F × F2S</li>
              <li>Americas: viewers × V2F × F2S</li>
              <li>Revenue: sum of conversions × ARPU × 6 years</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">2. Advertising Revenue</h2>
            <ul className="list-disc list-inside">
              <li>Winter uplift = (2170M + 2457M) × winter uplift rate</li>
              <li>Summer uplift = (2305M + 2645M) × summer uplift rate</li>
              <li>Total = Winter + Summer</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">3. Investment</h2>
            <ul className="list-disc list-inside">
              <li>Total investment = Partnership Fee × (1 + Activation Ratio)</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">4. ROI</h2>
            <ul className="list-disc list-inside">
              <li>Total revenue uplift = Subscription Revenue + Advertising Revenue</li>
              <li>Profit = Total Revenue Uplift − Investment</li>
              <li>ROI = Profit ÷ Investment</li>
            </ul>
          </section>
        </div>
      </div>
    );
  }
  