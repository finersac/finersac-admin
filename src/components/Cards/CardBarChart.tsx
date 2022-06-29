import React, { useEffect, useRef } from "react";
import { Chart, ChartConfiguration } from "chart.js";

let config: ChartConfiguration = {
  type: "bar",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: String(new Date().getFullYear()),
        backgroundColor: "#ed64a6",
        borderColor: "#ed64a6",
        data: [30, 78, 56, 34, 100, 45, 13],
        fill: false,
        barThickness: 8,
      },
      {
        label: String(new Date().getFullYear() - 1),
        fill: false,
        backgroundColor: "#4c51bf",
        borderColor: "#4c51bf",
        data: [27, 68, 86, 74, 10, 4, 87],
        barThickness: 8,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: "Orders Chart",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      legend: {
        labels: {
          color: "rgba(0,0,0,.4)",
        },
        align: "end",
        position: "bottom",
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      screenX: {
        display: false,
        pointLabels: {
          display: true,
          // labelString: "Month",
        },
        grid: {
          borderDash: [2],
          borderDashOffset: 2,
          color: "rgba(33, 37, 41, 0.3)",
          tickColor: "rgba(33, 37, 41, 0.3)",
          lineWidth: 2,
          borderWidth: 2,
        },
      },

      screenY: {
        display: true,
        pointLabels: {
          display: false,
          // labelString: "Value",
        },
        grid: {
          borderDash: [2],
          drawBorder: false,
          borderDashOffset: 2,
          color: "rgba(33, 37, 41, 0.2)",
          tickColor: "rgba(33, 37, 41, 0.15)",
          lineWidth: 2,
          borderWidth: 2,
        },
      },
    },
  },
};

export default function CardBarChart() {
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
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Performance
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Total orders
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart" ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
