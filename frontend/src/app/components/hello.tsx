"use client";

import { useEffect, useState } from "react";

type AlivenessData = {
  up: boolean;
};

function Hello() {
  const [data, setData] = useState<AlivenessData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector("#dynamic-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/aliveness");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: AlivenessData = await response.json();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    };

    fetchData();
  }, [isVisible]);

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-red-500 text-xl font-semibold">Error: {error}</div>
      </div>
    );

  if (!data)
    return (
      <div
        id="dynamic-section"
        className="flex items-center justify-center h-screen bg-gray-100"
      >
        <div className="text-gray-700 text-lg font-medium">Loading...</div>
      </div>
    );

  return (
    <div
      id="dynamic-section"
      className="flex items-center justify-center h-screen bg-gray-100"
    >
      <div
        className={`text-2xl font-semibold ${
          data.up ? "text-green-500" : "text-red-500"
        }`}
      >
        Is it up? <span>{data.up ? "Yes" : "No"}</span>
      </div>
    </div>
  );
}

export default Hello;
