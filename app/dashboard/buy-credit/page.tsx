"use client";
import { useState } from "react";

const creditPlanes = [
  {
    id: 1,
    count: 5,
    price: 0.99,
  },
  {
    id: 2,
    count: 10,
    price: 1.99,
  },
  {
    id: 3,
    count: 25,
    price: 3.99,
  },
  {
    id: 4,
    count: 50,
    price: 6.99,
  },
  {
    id: 5,
    count: 100,
    price: 9.99,
  },
];

type Plan = (typeof creditPlanes)[number];
const BuyCreditPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<null | Plan>(null);
  return (
    <div>
      <div>
        <h2 className="font-bold text-2xl">Buy More Credits</h2>
        <p>
          Unlock endless possibilities – Buy more credits and transform your
          room with AI magic! ✨🛋️
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
        {creditPlanes.map((plan) => (
          <div
            className={`flex flex-col gap-2 justify-center items-center border shadow-md rounded-lg p-5 ${
              selectedPlan?.id === plan.id ? "border-primary" : ""
            }`}
          >
            <h2 className="font-bold text-3xl">{plan.count}</h2>
            <h2 className="font-medium text-xl">Credits</h2>
            <button
              onClick={() => setSelectedPlan(plan)}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
            >
              Select
            </button>
            <h2 className="font-medium text-primary">${plan.price}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCreditPage;
