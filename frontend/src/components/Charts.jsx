import React from 'react';
import { Line } from 'react-chartjs-2';

const Charts = () => {
    const currentDate = new Date();
    const today = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const labels = Array.from({ length: 10 }, (_, index) => {
        const date = new Date();
        date.setDate(currentDate.getDate() - index);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }).reverse(); 

    const data = {
        labels: labels,
        values: [65, 59, 80, 81, 56, 55, 40, 50, 60, 70, 80, 75, 85, 90, 95, 100, 110, 120, 125, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230]
    };

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Data',
                data: data.values.slice(0, labels.length), 
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
                labels: labels // Labels for x-axis
            },
            y: {
                // Scale configuration for y-axis
                // Example options: min, max, stepSize, etc.
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
