import React, { useEffect, useRef } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";

const config: ChartConfiguration = {
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: String(new Date().getFullYear()),
        backgroundColor: "#4c51bf",
        borderColor: "#4c51bf",
        data: [65, 78, 66, 44, 56, 67, 75],
        fill: false,
      },
      {
        label: String(new Date().getFullYear() - 1),
        fill: false,
        backgroundColor: "#fff",
        borderColor: "#fff",
        data: [40, 68, 86, 74, 56, 60, 87],
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,

    plugins: {
      title: {
        display: false,
        text: "Sales Charts",
        color: "white",
      },
      legend: {
        labels: {
          color: "white",
        },
        align: "end",
        position: "bottom",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      screenX: {
        ticks: {
          color: "rgba(255,255,255,.7)",
        },
        display: true,
        pointLabels: {
          display: false,
          //label: "Month",
          color: "white",
        },
        grid: {
          display: false,
          borderDash: [2],
          borderDashOffset: 2,
          color: "rgba(33, 37, 41, 0.3)",
          tickColor: "rgba(0, 0, 0, 0)",
          lineWidth: 2,
          borderWidth: 2,
        },
      },
      screenY: {
        ticks: {
          color: "rgba(255,255,255,.7)",
        },
        display: true,
        pointLabels: {
          display: false,
          //labelString: "Value",
          color: "white",
        },
        grid: {
          borderDash: [3],
          borderDashOffset: 3,
          drawBorder: false,
          color: "rgba(255, 255, 255, 0.15)",
          tickColor: "rgba(33, 37, 41, 0)",
          lineWidth: 2,
          borderWidth: 2,
        },
      },
    },
  },
};

export default function CardLineChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }
    const chartInstance = new Chart(chartRef.current, config);
    return () => {
      chartInstance.destroy();
    };
  }, [chartRef]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">Sales value</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
