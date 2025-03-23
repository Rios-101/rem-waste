"use client";

import Image from "next/image";
import React, { useState } from "react";
import { MapPin, Trash2, Truck, Shield, Calendar, CreditCard } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSkips } from "@/components/utility/endpoints";
import { APICall } from "@/components/utility/function";
import SkipSkeleton from "@/components/Skeleton/SkipSkeleton";

export default function Home() {

  const steps = [
    { name: "Postcode", icon: MapPin, active: true },
    { name: "Waste Type", icon: Trash2, active: true },
    { name: "Select Skip", icon: Truck, active: true },
    { name: "Permit Check", icon: Shield, active: false },
    { name: "Choose Date", icon: Calendar, active: false },
    { name: "Payment", icon: CreditCard, active: false },
  ];


  const { data: skips, isLoading, isError } = useQuery<SkipType[]>({
    queryKey: ["getSkips"], // ✅ Correctly defined queryKey
    queryFn: async () => {
      const response = await APICall(getSkips, [], false);
      console.log(response);
      return response?.data ?? [];
    },
  });



  return (
    <div className="bg-black text-white min-h-screen ">

      <div className="bg-[#0037C1] py-2">
        <div className="max-w-7xl mx-auto flex items-center lg:justify-center px-4 lg:px-0 space-x-4 py-4 overflow-x-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {steps.map((step, index) => (
            <React.Fragment key={step.name}>
              <button
                className={`flex items-center whitespace-nowrap transition-colors ${step.active
                  ? "text-white hover:text-white cursor-pointer"
                  : "text-white cursor-not-allowed opacity-50"
                  }`}
                disabled={!step.active}
              >
                <step.icon className="w-5 h-5" />
                <span className="ml-2 text-white font-light text-sm tracking-wider">{step.name}</span>
              </button>
              {index < steps.length - 1 && <div className="w-2 h-px bg-white/50"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>


      <div className="max-w-7xl  mx-auto  p-10 text-center">
        <h2 className="text-3xl font-bold text-rios-100 text-center mb-2 mt-9">Choose Your Skip Size</h2>
        <p className="text-gray-400 font-light text-center mb-8">Select the skip size that best suits your needs</p>
      </div>


      {isLoading && <SkipSkeleton />}


      {isError && <p className="text-center text-red-400">Failed to load skips. Please try again.</p>}

      {!isLoading && !isError && skips && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 lg:px-0 md:gap-6 max-w-7xl mx-auto">
          {skips.map((skip) => (
            <div key={skip.size} className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-900 hover:border hover:border-[#0037C1]">
              <div className="relative w-full h-60">
                <Image
                  src={skip.size === 4 ? `/4-yard.jpg` : skip.size === 6 ? `/6-yard.jpg` : skip.size === 8 ? `/8-yard.jpg` : skip.size === 10 ? `/10-yard.jpg` : skip.size === 12 ? `/12-yard.jpg` : `/6-yard.jpg`}
                  alt={`${skip.size} Yard Skip`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                {skip.allowed_on_road && (
                  <p className="absolute top-2 right-2 bg-black text-yellow-400 px-2 py-1 rounded text-xs">
                    ⚠ Private Property Only
                  </p>
                )}
              </div>
              <h3 className="text-lg md:text-xl font-semibold mt-4">{skip.size} Yard Skip</h3>
              <p className="text-gray-400 text-sm">{skip.hire_period_days} day hire period</p>
              <p className="text-lg font-bold text-blue-500 mt-2 mb-4">
                £{skip.price_before_vat} <span className="text-white text-xs">per week</span>
              </p>
              <button className="w-full py-2.5 md:py-3 px-4 rounded-md transition-all flex items-center justify-center space-x-2
           bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] hover:border-[#0037C1]
           false"><span>Choose this skip
                </span>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg> */}
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
