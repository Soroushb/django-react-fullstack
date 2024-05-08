import React, { useEffect, useState } from 'react';
import { Line, Doughnut  } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const LineGraph = ({dates, readingData}) => {

    // Chart data object
    const chartData = {
        labels: dates.sort(),
        datasets: [
            {
                label: 'Reading Time',
                data: readingData.sort(),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            x: {
                type: 'category', // Scale type for x-axis
                labels: dates // Labels for x-axis
            },
            y: {
                // Scale configuration for y-axis
                beginAtZero: true // Start y-axis from zero
            }
        }
    };

  return (
    <div>
        <Line data={chartData} options={options} />

    </div>
  )
}

export default LineGraph