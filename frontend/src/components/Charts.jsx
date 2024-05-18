import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../api';
import Chart from 'chart.js/auto';

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

    useEffect(() => {
        if (Object.keys(goalTimes).length > 0 && !showGoal) {
            setShowGoal(Object.keys(goalTimes)[0]);
        }
    }, [goalTimes]);

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

    const formatDateForServer = (date) => {
        const dateObj = new Date(date);
        return dateObj.toISOString().split('T')[0];
    };

    const addUserGoal = async () => {
        const formattedDate = formatDateForServer(date);
        const existingGoal = Object.values(goalTimes).flatMap(item => item)
            .find(item => item.date === formattedDate && item.name === goalName);

        if (existingGoal) {
            const goalType = Object.keys(goalTimes).find(key =>
                goalTimes[key].some(item => item.date === formattedDate && item.name === goalName)
            );
            const updatedGoalTimes = { ...goalTimes };
            updatedGoalTimes[goalType] = updatedGoalTimes[goalType].map(item =>
                item.date === formattedDate && item.name === goalName ? { ...item, mins_done } : item
            );
            setGoalTimes(updatedGoalTimes);
            await api.put(`/api/goal-logs/${existingGoal.id}/`, { mins_done, date: formattedDate, name: goalName })
            .catch((err) => console.log(err));
        } else {
            api.post(`/api/goal-logs/`, { name: goalName, date: formattedDate, mins_done })
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
        const formattedDate = formatDateForServer(date);
        const existingIndex = readingTimes.findIndex(item => item.date === formattedDate);

        if (existingIndex !== -1) {
            const updatedReadingTimes = [...readingTimes];
            updatedReadingTimes[existingIndex] = { ...updatedReadingTimes[existingIndex], mins_read };
            setReadingTimes(updatedReadingTimes);
            await api.put(`/api/reading-logs/${readingTimes[existingIndex].id}/`, { mins_read, date: formattedDate });
            alert("Reading time updated");
        } else {
            const res = await api.post("/api/reading-logs/", { mins_read, date: formattedDate });

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
                <div className='flex justify-center mt-14 mb-4'>
                    <h1 className='text-bold text-white text-3xl'>Your Goals:</h1>
                </div>
                <div className='flex m-8 justify-between p-4'>
                    {Object.keys(goalTimes).map((goal) => (
                        <div
                            key={goal}
                            onClick={() => setShowGoal(goal)}
                            className={`${showGoal === goal ? "bg-white text-purple-800" : "bg-purple-600 text-white"} p-4 rounded-lg hover:scale-110 hover:cursor-pointer`}
                        >
                            {goal}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                {Object.entries(goalTimes).map(([goalName, goalData]) => {
                    if (showGoal !== goalName) return null;
                    let sortedData = goalData.sort((a,b) => {return new Date(a.date) - new Date(b.date);})
                    console.log(sortedData)
                    let goalDates = goalData.map(goal => goal.date);
                    let goalMins = goalData.map(goal => goal.mins_done);

                    let goalChartData = {
                        labels: goalDates,
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
                        <div key={goalName} className='flex justify-between bg-white p-5 rounded-lg' style={{ height: '400px' }}>
                            <div className='m-4'>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    setGoalName(showGoal);
                                    addUserGoal();
                                }}>
                                    <label>Minutes Done:</label>
                                    <input onChange={(e) => setMins_done(parseInt(e.target.value, 10))} value={mins_done} name='mins_done' type='number' />
                                    <label>Date:</label>
                                    <input onChange={(e) => setDate(e.target.value)} value={date} name='date' type='date' />
                                    <button className='bg-blue-700 rounded-md p-2 text-white' type='submit'>Add/Update Goal Time</button>
                                </form>
                            </div>
                            <Line data={goalChartData} options={goalOptions} />
                        </div>
                    );
                })}
            </div>
            {/*
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
                            <input onChange={(e) => setMins_read(parseFloat(e.target.value))} value={mins_read} name='mins_read' type='number' />
                            <label>Date:</label>
                            <input onChange={(e) => setDate(e.target.value)} value={date} name='date' type='date' />
                            <button className='bg-blue-700 rounded-md p-2 text-white' type='submit'>Add Reading Time</button>
                        </form>
                    </div>
                    <Line data={chartData} options={options} />
                </div>
            </div>
            */}
            
        </div>
    );
};

export default Charts;
