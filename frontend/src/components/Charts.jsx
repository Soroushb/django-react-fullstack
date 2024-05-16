import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../api';

const Charts = () => {
    const [readingTimes, setReadingTimes] = useState([]);
    const [mins_read, setMins_read] = useState("");
    const [date, setDate] = useState("");
    const [goalName, setGoalName] = useState("");
    const [mins_done, setMins_done] = useState(0);
    const [goalTimes, setGoalTimes] = useState({});
    const [showGoal, setShowGoal] = useState("");

    useEffect(() => {
        getReadingTime();
        getGoalList();
    }, []);

    const getReadingTime = () => {
        api.get("/api/reading-logs/")
            .then((res) => res.data)
            .then((data) => setReadingTimes(data))
            .catch((err) => console.log(err));
    };

    const getGoalList = () => {
        api.get("/api/goal-logs/")
            .then((res) => res.data)
            .then((data) => {
                const lowerCaseGoalNames = data.map(item => item.name.toLowerCase());
                const uniqueLowerCaseGoalNames = [...new Set(lowerCaseGoalNames)];

                const goalDataMap = data.reduce((accumulator, currentValue) => {
                    const lowercaseName = currentValue.name.toLowerCase();

                    if (lowercaseName in accumulator) {
                        accumulator[lowercaseName].push(currentValue);
                    } else {
                        accumulator[lowercaseName] = [currentValue];
                    }

                    return accumulator;
                }, {});

                setGoalTimes(goalDataMap);
            })
            .catch((err) => console.log(err));
    };

    const addUserGoal = async () => {
        const existingGoal = Object.values(goalTimes).flatMap(item => item)
            .find(item => item.date === date && item.name === goalName);
        
        if (existingGoal) {
            const goalType = Object.keys(goalTimes).find(key =>
                goalTimes[key].some(item => item.date === date && item.name === goalName)
            );
            const updatedGoalTimes = { ...goalTimes };
            updatedGoalTimes[goalType][existingGoal.id] = { name: goalName, date, mins_done };
            setGoalTimes(updatedGoalTimes); 
            await api.put(`/api/goal-logs/${existingGoal.id}/`, { mins_done, date, name: goalName });
        } else {
            api.post(`/api/goal-logs/`, { name: goalName, date, mins_done })
                .then((res) => {
                    console.log("New goal added:", res.data);
                    setGoalName(""); // Clear the input field
                    getGoalList();
                    alert(`New ${goalName} added.`);
                })
                .catch((err) => {
                    console.error("Error adding new goal:", err);
                });
        }
    };

    const addReadingTime = async () => {
        const existingIndex = readingTimes.findIndex(item => item.date === date);

        if (existingIndex !== -1) {
            const updatedReadingTimes = [...readingTimes];
            updatedReadingTimes[existingIndex] = { date, mins_read };
            setReadingTimes(updatedReadingTimes);
            await api.put(`/api/reading-logs/${readingTimes[existingIndex].id}/`, { mins_read, date });
            alert("Reading time updated");
        } else {
            const res = await api.post("/api/reading-logs/", { mins_read, date });

            if (res.status === 201) {
                alert("New data added");
                getReadingTime();
            } else {
                console.log("Error");
            }
        }
    };

    const chartData = {
        labels: readingTimes.map(item => item.date).sort(),
        datasets: [
            {
                label: 'Reading Time',
                data: readingTimes.map(item => parseFloat(item.mins_read)),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                labels: readingTimes.map(item => item.date).sort()
            },
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className="container mx-auto overflow-x-hidden">
            <div>
                <h2 className="text-2xl font-bold mb-4 text-white mt-8">Reading Time Graph</h2>
    
                <div className="flex justify-between bg-white p-4 rounded-lg shadow" style={{ height: '400px' }}>
                    <div className='m-4'>
                        <h2>Add Input</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            addReadingTime();
                        }}>
                            <label>Minutes Read:</label>
                            <input onChange={(e) => setMins_read(e.target.value)} value={mins_read} name='mins_read' type='text'></input>
                            <label>Date:</label>
                            <input onChange={(e) => setDate(e.target.value)} value={date} name='date' type='date'></input>
                            <button className='bg-blue-700 rounded-md p-2 text-white' type='submit'>Add Reading Time</button>
                        </form>
                    </div>
                    <Line data={chartData} options={options} />
                </div>
            </div>
            <div>
                <div>
                    
                    <div className='m-4'>
                        <h2>Add A new Goal</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            addUserGoal();
                        }}>
                            <label>Name:</label>
                            <input onChange={(e) => setGoalName(e.target.value)} value={goalName} name='name' type='text'></input>
                            <label>Minutes Done:</label>
                            <input onChange={(e) => setMins_done(e.target.value)} value={mins_done} name='mins_done' type='number'></input>
                            <label>Date:</label>
                            <input onChange={(e) => setDate(e.target.value)} value={date} name='date' type='date'></input>
                            <button className='bg-blue-700 rounded-md p-2 text-white' type='submit'>Add Goal</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className=''>
                {Object.entries(goalTimes).map(([goalName, goalData]) => {
                    if (showGoal !== goalName) return null;

                    let goalDates = goalData.map(goal => goal.date);
                    let goalMins = goalData.map(goal => goal.mins_done);

                    let goalChartData = {
                        labels: goalDates.sort(),
                        datasets: [
                            {
                                label: goalName,
                                data: goalMins,
                                fill: false,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                tension: 0.1
                            }
                        ]
                    };

                    let goalOptions = {
                        scales: {
                            x: {
                                type: 'category',
                                labels: goalDates
                            },
                            y: {
                                beginAtZero: true
                            }
                        }
                    };

                    return (
                        <div key={goalName} className='bg-white p-5 rounded-lg'>
                        <h1 className='text-bold'>Your Goals:</h1>
                        <div className='flex justify-between p-4 '>
                            {Object.keys(goalTimes).map((goal) => (
                                <div key={goal} onClick={() => setShowGoal(goal)} className='bg-purple-600 text-white p-4 rounded-lg hover:scale-110 hover:cursor-pointer'>
                                    {goal}
                                </div>
                            ))}
                    </div>
                            <Line data={goalChartData} options={goalOptions} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Charts;
