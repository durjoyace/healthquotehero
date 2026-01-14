"use client";

import { AnimateOnScroll } from "@/components/ScrollAnimations";

interface CostRow {
  item: string;
  cost2025: string;
  cost2026: string;
  change: string;
  changeType: "increase" | "decrease" | "same";
}

const healthInsuranceCosts: CostRow[] = [
  {
    item: "Average Silver Plan (Before Subsidies)",
    cost2025: "$659/mo",
    cost2026: "$687/mo",
    change: "+4.2%",
    changeType: "increase",
  },
  {
    item: "Average Bronze Plan",
    cost2025: "$478/mo",
    cost2026: "$498/mo",
    change: "+4.2%",
    changeType: "increase",
  },
  {
    item: "Average Gold Plan",
    cost2025: "$745/mo",
    cost2026: "$777/mo",
    change: "+4.3%",
    changeType: "increase",
  },
  {
    item: "Average HMO Plan",
    cost2025: "$540/mo",
    cost2026: "$562/mo",
    change: "+4.1%",
    changeType: "increase",
  },
  {
    item: "Average PPO Plan",
    cost2025: "$653/mo",
    cost2026: "$680/mo",
    change: "+4.1%",
    changeType: "increase",
  },
  {
    item: "Subsidy Income Limit (Individual)",
    cost2025: "No Limit*",
    cost2026: "$62,600",
    change: "Cliff Returns",
    changeType: "increase",
  },
];

const medicareCosts: CostRow[] = [
  {
    item: "Part B Premium (Standard)",
    cost2025: "$185.00/mo",
    cost2026: "$202.90/mo",
    change: "+9.7%",
    changeType: "increase",
  },
  {
    item: "Part B Annual Deductible",
    cost2025: "$257",
    cost2026: "$283",
    change: "+10.1%",
    changeType: "increase",
  },
  {
    item: "Part D Max Out-of-Pocket",
    cost2025: "$2,000",
    cost2026: "$2,100",
    change: "+5%",
    changeType: "increase",
  },
  {
    item: "Part D Max Deductible",
    cost2025: "$590",
    cost2026: "$615",
    change: "+4.2%",
    changeType: "increase",
  },
  {
    item: "Medicare Advantage Max MOOP",
    cost2025: "$9,350",
    cost2026: "$9,250",
    change: "-1.1%",
    changeType: "decrease",
  },
  {
    item: "Part A Hospital Deductible",
    cost2025: "$1,676",
    cost2026: "$1,762",
    change: "+5.1%",
    changeType: "increase",
  },
];

const negotiatedDrugPrices = [
  { drug: "Eliquis", condition: "Blood Clots", oldPrice: "$521", newPrice: "$231", savings: "56%" },
  { drug: "Jardiance", condition: "Diabetes/Heart", oldPrice: "$573", newPrice: "$197", savings: "66%" },
  { drug: "Xarelto", condition: "Blood Clots", oldPrice: "$517", newPrice: "$197", savings: "62%" },
  { drug: "Januvia", condition: "Diabetes", oldPrice: "$527", newPrice: "$113", savings: "79%" },
  { drug: "Farxiga", condition: "Diabetes/Kidney", oldPrice: "$556", newPrice: "$178", savings: "68%" },
  { drug: "Entresto", condition: "Heart Failure", oldPrice: "$628", newPrice: "$295", savings: "53%" },
  { drug: "Enbrel", condition: "Autoimmune", oldPrice: "$7,106", newPrice: "$2,355", savings: "67%" },
  { drug: "Imbruvica", condition: "Cancer", oldPrice: "$14,934", newPrice: "$9,319", savings: "38%" },
  { drug: "Stelara", condition: "Autoimmune", oldPrice: "$13,836", newPrice: "$4,695", savings: "66%" },
  { drug: "NovoLog/Fiasp", condition: "Insulin", oldPrice: "$495", newPrice: "$119", savings: "76%" },
];

interface CostComparisonTableProps {
  type: "health" | "medicare";
  className?: string;
}

export function CostComparisonTable({ type, className = "" }: CostComparisonTableProps) {
  const costs = type === "health" ? healthInsuranceCosts : medicareCosts;
  const title = type === "health"
    ? "2025 vs 2026 Health Insurance Costs"
    : "2025 vs 2026 Medicare Costs";

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div className="bg-primary-900 px-6 py-4">
        <h3 className="text-white font-heading font-bold text-lg mb-0">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Item</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">2025</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">2026</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {costs.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900">{row.item}</td>
                <td className="px-4 py-3 text-right text-gray-600">{row.cost2025}</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">{row.cost2026}</td>
                <td className={`px-4 py-3 text-right font-medium ${
                  row.changeType === "decrease" ? "text-green-600" :
                  row.changeType === "increase" ? "text-red-600" : "text-gray-600"
                }`}>
                  {row.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-0">
          {type === "health"
            ? "* Enhanced ACA subsidies had no income cap in 2021-2025. The 400% FPL cliff returned for 2026."
            : "Sources: CMS.gov 2026 Medicare Premiums and Deductibles Fact Sheet"
          }
        </p>
      </div>
    </div>
  );
}

interface DrugPriceTableProps {
  className?: string;
}

export function DrugPriceTable({ className = "" }: DrugPriceTableProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div className="bg-primary-900 px-6 py-4">
        <h3 className="text-white font-heading font-bold text-lg mb-0">
          2026 Medicare Negotiated Drug Prices
        </h3>
        <p className="text-white/70 text-sm mb-0 mt-1">
          Under the Inflation Reduction Act - Effective January 1, 2026
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Drug Name</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Treats</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Old Price</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">New Price</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Savings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {negotiatedDrugPrices.map((drug, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{drug.drug}</td>
                <td className="px-4 py-3 text-gray-600">{drug.condition}</td>
                <td className="px-4 py-3 text-right text-gray-500 line-through">{drug.oldPrice}</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">{drug.newPrice}</td>
                <td className="px-4 py-3 text-right">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {drug.savings}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-0">
          Prices shown are for 30-day supply. Actual costs depend on your Part D plan.
          Source: <a href="https://www.cms.gov/inflation-reduction-act-and-medicare/medicare-drug-price-negotiation" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">CMS.gov Medicare Drug Price Negotiation Program</a>
        </p>
      </div>
    </div>
  );
}

export function HealthInsuranceCostSection() {
  return (
    <section className="section">
      <div className="container max-w-4xl">
        <AnimateOnScroll className="text-center mb-10">
          <span className="badge badge-primary mb-4">2026 Cost Data</span>
          <h2 className="text-gray-900">
            Health Insurance Costs: 2025 vs 2026
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-0">
            Understand how costs have changed and what you can expect to pay in 2026.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <CostComparisonTable type="health" />
        </AnimateOnScroll>
      </div>
    </section>
  );
}

export function MedicareCostSection() {
  return (
    <section className="section">
      <div className="container max-w-5xl">
        <AnimateOnScroll className="text-center mb-10">
          <span className="badge badge-primary mb-4">2026 Medicare Data</span>
          <h2 className="text-gray-900">
            Medicare Costs &amp; Drug Savings for 2026
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-0">
            See how Medicare costs have changed and the new negotiated drug prices that could save you thousands.
          </p>
        </AnimateOnScroll>

        <div className="space-y-8">
          <AnimateOnScroll>
            <CostComparisonTable type="medicare" />
          </AnimateOnScroll>

          <AnimateOnScroll delay={100}>
            <DrugPriceTable />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
