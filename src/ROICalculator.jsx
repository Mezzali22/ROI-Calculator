import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ROICalculator() {
  const [totalViewers, setTotalViewers] = useState(400000000);
  const [arpu, setArpu] = useState(56.16);
  const [fee, setFee] = useState(486000000);

  const [emV2F, setEmV2F] = useState(1.5);
  const [apV2F, setApV2F] = useState(0.5);
  const [amV2F, setAmV2F] = useState(0.8);

  const [emF2S, setEmF2S] = useState(25);
  const [apF2S, setApF2S] = useState(12);
  const [amF2S, setAmF2S] = useState(20);

  const [winterUplift, setWinterUplift] = useState(4);
  const [summerUplift, setSummerUplift] = useState(8);
  const [activationRatio, setActivationRatio] = useState(100);

  const applyPreset = () => {
    setArpu(66.12);
    setFee(426000000);
  };

  const calculateROI = () => {
    const v2fTotal =
      (totalViewers * emV2F) / 100 +
      (totalViewers * apV2F) / 100 +
      (totalViewers * amV2F) / 100;

    const convertedSubscribers =
      (v2fTotal *
        (emF2S / 100 + apF2S / 100 + amF2S / 100) *
        (activationRatio / 100)) /
      3;

    const upliftMultiplier = 1 + (winterUplift + summerUplift) / 200;
    const revenue = convertedSubscribers * arpu * upliftMultiplier;

    return {
      roi: ((revenue - fee) / fee) * 100,
      revenue: revenue.toFixed(2),
    };
  };

  const { roi, revenue } = calculateROI();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 font-sans text-black">
      <h1 className="text-3xl font-bold text-center">ROI Calculator</h1>

      <div className="flex gap-4 justify-center">
        <button
          onClick={applyPreset}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Apply Preset
        </button>
        <Link
          to="/logistics"
          className="bg-purple-600 text-white px-4 py-2 rounded shadow"
        >
          Calculation Logistics →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label>Total Viewers</label>
          <input
            type="number"
            value={totalViewers}
            onChange={(e) => setTotalViewers(+e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label>ARPU</label>
          <input
            type="number"
            step="0.01"
            value={arpu}
            onChange={(e) => setArpu(+e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label>Total Partnership Fee</label>
          <input
            type="number"
            value={fee}
            onChange={(e) => setFee(+e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label>EMEA V2F %: {emV2F.toFixed(2)}</label>
          <input
            type="range"
            min="1"
            max="1.5"
            step="0.01"
            value={emV2F}
            onChange={(e) => setEmV2F(+e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label>APAC V2F %: {apV2F.toFixed(2)}</label>
          <input
            type="range"
            min="0.45"
            max="0.5"
            step="0.01"
            value={apV2F}
            onChange={(e) => setApV2F(+e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label>Americas V2F %: {amV2F.toFixed(2)}</label>
          <input
            type="range"
            min="0.75"
            max="0.8"
            step="0.01"
            value={amV2F}
            onChange={(e) => setAmV2F(+e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label>EMEA F2S %: {emF2S.toFixed(2)}</label>
          <input
            type="range"
            min="18"
            max="25"
            value={emF2S}
            onChange={(e) => setEmF2S(+e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label>APAC F2S %: {apF2S.toFixed(2)}</label>
          <input
            type="range"
            min="5"
            max="12"
            value={apF2S}
            onChange={(e) => setApF2S(+e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label>Americas F2S %: {amF2S.toFixed(2)}</label>
          <input
            type="range"
            min="12"
            max="20"
            value={amF2S}
            onChange={(e) => setAmF2S(+e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label>Winter Uplift: {winterUplift}%</label>
          <input
            type="range"
            min="2"
            max="4"
            value={winterUplift}
            onChange={(e) => setWinterUplift(+e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label>Summer Uplift: {summerUplift}%</label>
          <input
            type="range"
            min="5"
            max="8"
            value={summerUplift}
            onChange={(e) => setSummerUplift(+e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label>Activation Ratio: {activationRatio.toFixed(2)}%</label>
          <input
            type="range"
            min="80"
            max="120"
            value={activationRatio}
            onChange={(e) => setActivationRatio(+e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="bg-blue-50 p-6 mt-8 rounded-lg shadow">
        <h2 className="text-xl font-bold text-blue-900">Results</h2>
        <p className="mt-2">Estimated Revenue: ${revenue}</p>
        <p>ROI: {roi.toFixed(2)}%</p>
      </div>
    </div>
  );
}
