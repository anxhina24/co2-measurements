import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import type { ChartData, ChartOptions, ScriptableContext } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getAirQualityLevel } from '../utils/airQualityLevel';
import {LineController, CategoryScale, LinearScale, LineElement, PointElement, Title, Chart } from 'chart.js';
Chart.register(LineController, LinearScale, CategoryScale, LineElement, PointElement, Title, ChartDataLabels);

interface CO2ChartProps {
  co2Values: number[];
  co2Labels: string[];
}

const CO2Chart: React.FC<CO2ChartProps> = ({ co2Values, co2Labels }) => {
  const chartData: ChartData<any> = {
    labels: co2Labels,
    datasets: [
      {
        label: 'CO2 Values',
        data: co2Values,
        borderColor: 'lightblue',
        borderWidth: 1,
      },
    ],
  };

  const  plugins = {
      datalabels: {
        align: (context: ScriptableContext<'line'>) => {
          // Align data labels to the left if it's the last data point,
          // else align to the right
          const index = context.dataIndex;
          const totalDataPoints = context.dataset.data.length;
          if (index === totalDataPoints - 1 && index !== 0) {
            return "left";
          }else {
            return "right"
          }
        },
        //Formats the CO2 value and its corresponding air quality level for displaying in the chart data labels.
        formatter: (value: number) => {
          const co2Value = parseFloat(value.toFixed(2));
          const airQuality = getAirQualityLevel(co2Value);
          return`${co2Value}  ppm (${airQuality.level})`
        },
      },
    }

  const chartOptions: ChartOptions<any> = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 3500,
      },
    },
    plugins,
    maintainAspectRatio: false,
    responsive: true
  };
  return (
<div>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <span style={{ color: 'green', fontWeight: 'bold' }}>&#9632; Good</span>
    <span style={{ color: 'orange', fontWeight: 'bold' }}>&#9632; Average</span>
    <span style={{ color: 'red', fontWeight: 'bold' }}>&#9632; Bad</span>
  </div>
  <div style={{ width: '100%', height: '400px' }}>
    <Line data={chartData} options={chartOptions} />
  </div>
</div>
  );
};

export default CO2Chart;
