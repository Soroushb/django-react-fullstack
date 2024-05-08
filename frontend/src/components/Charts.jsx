import React, { useEffect, useState } from 'react';
import { Line, Doughnut  } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import api from '../api';

const Charts = () => {
    const [readingTimes, setReadingTimes] = useState([]);
    const [mins_read, setMins_read] = useState("");
    const [date, setDate] = useState("");

    const [goalTimes, setGoalTimes] = useState([]);
    const [mins_done, setMins_done] = useState("");

    useEffect(() => {
        getReadingTime();
    }, []);

    const getReadingTime = () => {
        api.get("/api/reading-logs/")
            .then((res) => res.data)
            .then((data) => setReadingTimes(data))
            .catch((err) => console.log(err))
    }

    const getGoalTime = () => {
        api.get("/api/goal-logs/")
            .then((res) => res.data)
            .then((data) => setReadingTimes(data))
            .catch((err) => console.log(err))
    }

    

    const addReadingTime = async () => {
      // Check if the date already exists in the reading times array
      const existingIndex = readingTimes.findIndex(item => item.date === date);
  
      if (existingIndex !== -1) {
          // If the date exists, update the reading time
          const updatedReadingTimes = [...readingTimes];
          updatedReadingTimes[existingIndex] = { date, mins_read };
          console.log(date)
          setReadingTimes(updatedReadingTimes); // Update state with the updated reading times
          await api.put(`/api/reading-logs/${readingTimes[existingIndex].id}/`, { mins_read, date });
          alert("Reading time updated");
      } else {
          // If the date doesn't exist, add a new reading time
          const res = await api.post("/api/reading-logs/", { mins_read, date });
  
          if (res.status === 201) {
              alert("New data added");
              getReadingTime(); // Refresh data after adding new reading time
          } else {
              console.log("Error");
          }
      }
  }

    
    const pieChartData = {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: ['red', 'blue', 'yellow'],
              borderWidth: 0
          }
      ]
  };

    // Extract dates and reading times from readingTimes array
    const dates = readingTimes.map(item => item.date);
    const readingData = readingTimes.map(item => parseFloat(item.mins_read)); // Convert to float if mins_read is a string

    // Chart data object
    const chartData = {
        labels: dates.sort(),
        datasets: [
            {
                label: 'Reading Time',
                data: readingData,
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
                labels: dates // Labels for x-axis
            },
            y: {
                // Scale configuration for y-axis
                beginAtZero: true // Start y-axis from zero
            }
        }
    };

    return (
        <div className="container mx-auto  overflow-x-hidden ">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white mt-8">Reading Time Graph</h2>
           
            <div className="flex justify-between bg-white p-4 rounded-lg shadow " style={{ height: '400px' }}>
            <div className='m-4'>
              <h2>Add Input</h2>
              <form onSubmit={(e) => {
                            e.preventDefault(); // Prevent default form submission
                            addReadingTime(); // Call addReadingTime function
                        }}>
                <label>Minutes Read:</label>
                <input onChange={(e) => setMins_read(e.target.value)} value={mins_read} name='mins_read' type='text'></input>
                <label>Date:</label>
                <input onChange={(e) => setDate(e.target.value)} value={date} name='date' type='date'></input>
                <button className='bg-blue-700 rounded-md p-2 text-white'  type='submit'>Add Reading Time</button>
              </form>
              
            </div>
                <Line data={chartData} options={options} />
            </div>
        
            </div>
            <div>
            <h2 className="text-2xl font-bold mb-4">Pie Chart</h2>
            <div className="bg-white p-4 rounded-lg shadow">
                <Doughnut data={pieChartData} />
            </div>
            </div>
        </div>
    );
};

export default Charts;