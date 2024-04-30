import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Charts = () => {
    // Sample data
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      values: [65, 59, 80, 81, 56, 55, 40]
    };
  
    // Chart data object
    const chartData = {
      labels: data.labels,
      datasets: [
        {
          label: 'Data',
          data: data.values,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }
      ]
    };
  
    // Scale configuration for the chart
    const options = {
      scales: {
        x: {
          type: 'category', // Scale type for x-axis
          labels: data.labels // Labels for x-axis
        },
        y: {
          // Scale configuration for y-axis
          // Example options: min, max, stepSize, etc.
          annotations:{
            y: {

                type: 'line',
                value: 70,
                borderColor: "red",
                borderWidth: 10,
                label: {
                    content: "Goal",
                    enabled: true,
                    position: "start"
                }

            }
          },
          beginAtZero: true // Start y-axis from zero

          
        }
      }
    };
  
    return (
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Line Graph</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <Line data={chartData} options={options} />
        </div>
      </div>
    );
  };
  
  export default Charts;