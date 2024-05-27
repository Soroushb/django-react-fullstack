import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import api from '../api';
import Chart from 'chart.js/auto';
import { IoIosClose } from "react-icons/io";

const Charts = () => {
    const [readingTimes, setReadingTimes] = useState([]);
    const [mins_read, setMins_read] = useState("");
    const [date, setDate] = useState("");
    const [goalName, setGoalName] = useState("");
    const [mins_done, setMins_done] = useState(0);
    const [goalTimes, setGoalTimes] = useState({});
    const [showGoal, setShowGoal] = useState("");
    const [showAddGoal, setShowAddGoal] = useState(false);

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleTodayClick = () => {
        setDate(getTodayDate());
    };

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

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

    const getAllDatesInRange = (startDate, endDate) => {
        const dateArray = [];
        let currentDate = new Date(startDate);
        const stopDate = new Date(endDate);
        while (currentDate <= stopDate) {
            dateArray.push(new Date(currentDate).toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dateArray;
    };

    const fillMissingDates = (data, valueKey) => {
        if (data.length === 0) return [];

        const allDates = getAllDatesInRange(data[0].date, data[data.length - 1].date);
        const dataMap = data.reduce((acc, current) => {
            acc[current.date] = current[valueKey];
            return acc;
        }, {});

        return allDates.map(date => ({
            date,
            [valueKey]: dataMap[date] !== undefined ? dataMap[date] : 0
        }));
    };

    const filledReadingTimes = fillMissingDates(readingTimes, 'mins_read');

    const chartData = {
        labels: filledReadingTimes.map(item => item.date),
        datasets: [
            {
                label: 'Reading Time',
                data: filledReadingTimes.map(item => parseFloat(item.mins_read)),
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
                labels: filledReadingTimes.map(item => item.date)
            },
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        
        <>
        <div className='lg:hidden xl:hidden container mx-auto'>
        <div>
            
                {Object.entries(goalTimes).map(([goalName, goalData]) => {
                    if (showGoal !== goalName) return null;

                    const sortedData = goalData.sort((a, b) => new Date(a.date) - new Date(b.date));
                    const filledGoalData = fillMissingDates(sortedData, 'mins_done');

                    const goalDates = filledGoalData.map(goal => goal.date);
                    const goalMins = filledGoalData.map(goal => parseFloat(goal.mins_done) || 0);

                    const avg = (goalMins.reduce((sum, a) => sum + a, 0) / goalMins.length).toFixed(0);
                    console.log(avg);

                    const goalChartData = {
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

                    const goalOptions = {
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
                        <div key={goalName} className='flex lg:flex-row flex-col justify-between  p-5 rounded-lg lg:h-400' >
                            
                            <div className='flex flex-col w-full'>
                            {Object.keys(goalTimes).map((goal) => (<>
                            <div 
                                key={goal}
                                onClick={() => setShowGoal(goal)}
                                className='text-white flex m-1'>
                            {goal}
                            </div>
                            </>))}
                            <Line className='self-center bg-white mt-10' data={goalChartData} options={goalOptions} />
                            <h2 className='bg-blue-700 p-2 w-1/2 self-center m-2 text-center rounded-md text-white'>Average: {avg} Minutes</h2>

                            </div>
                            <div className='m-4 scale-75'>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    setGoalName(showGoal);
                                    addUserGoal();
                                }}>
                                    <label>Minutes Done:</label>
                                    <input onChange={(e) => setMins_done(parseInt(e.target.value, 10))} value={mins_done} name='mins_done' type='number' />
                                    <label>Date:</label>
                                    <div className='flex lg:flex-row flex-col'>
                                        <input onChange={(e) => setDate(e.target.value)} value={date} name='date' type='date' />
                                        <div className='flex justify-center align-middle items-center'>
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                handleTodayClick();
                                            }} className='border-red-900 m-2 border-2  flex items-center justify-center rounded-md h-1/2'>
                                                <p className='p-2'>Today</p>
                                            </button>
                                        </div>
                                    </div>
                                    <button className='bg-blue-700 rounded-md p-2 text-white' type='submit'>Add/Update Goal Time</button>
                                </form>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        <div className="container hidden lg:block xl:block  mx-auto pl-10 pr-10 pb-20 pt-20">
            <div>
                
            </div>
            <div>
                {Object.entries(goalTimes).map(([goalName, goalData]) => {
                    if (showGoal !== goalName) return null;

                    const sortedData = goalData.sort((a, b) => new Date(a.date) - new Date(b.date));
                    const filledGoalData = fillMissingDates(sortedData, 'mins_done');

                    const goalDates = filledGoalData.map(goal => goal.date);
                    const goalMins = filledGoalData.map(goal => parseFloat(goal.mins_done) || 0);

                    const avg = (goalMins.reduce((sum, a) => sum + a, 0) / goalMins.length).toFixed(0);
                    console.log(avg);

                    const goalChartData = {
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

                    const goalOptions = {
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
                        <div key={goalName} className='flex lg:flex-row flex-col justify-between bg-white p-5 rounded-lg lg:h-400' >
                            <div className='flex flex-col w-1/2'>

                            <div>
                

                {showAddGoal && (
                
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setGoalName(showGoal);
                        addUserGoal();
                    }}>
                        <div className='flex justify-stretch'>
                        <h1>Add a New Goal</h1>
                            <div onClick={() => setShowAddGoal(false)} className='text-white bg-red-500 p-1 rounded-full scale-150 hover:bg-red-700 hover:cursor-pointer'><IoIosClose /></div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div>

                                <label>Name:</label>
                                <input onChange={(e) => setGoalName(e.target.value)} value={goalName} name='name' type='text' />
                                <label>Minutes Done:</label>
                                <input onChange={(e) => setMins_done(parseInt(e.target.value, 10))} value={mins_done} name='mins_done' type='number' />
                                <label>Date:</label>
                                <input onChange={(e) => setDate(e.target.value)} value={date} name='date' type='date' />
                                <button type='submit' className='text-bold bg-red-800 text-white p-4 rounded-md'>Add a New Goal</button>
                            </div>
                        </div>
                    </form>
                )}
              </div>
            
                            <div className='m-4'>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    setGoalName(showGoal);
                                    addUserGoal();
                                }}>
                                    <label>Minutes Done:</label>
                                    <input onChange={(e) => setMins_done(parseInt(e.target.value, 10))} value={mins_done} name='mins_done' type='number' />
                                    <label>Date:</label>
                                    <div className='flex lg:flex-row flex-col'>
                                        <input onChange={(e) => setDate(e.target.value)} value={date} name='date' type='date' />
                                        <div className='flex justify-center align-middle items-center'>
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                handleTodayClick();
                                            }} className='border-red-900 m-2 border-2  flex items-center justify-center rounded-md h-1/2'>
                                                <p className='p-2'>Today</p>
                                            </button>
                                        </div>
                                    </div>
                                    <button className='bg-blue-700 rounded-md p-2 text-white' type='submit'>Update Goal Time</button>
                                </form>
                            </div>
                            </div>

                            <div className='flex flex-col w-full'>
                            <div className='flex lg:flex-row flex-col m-8 justify-center p-4'>
                    {Object.keys(goalTimes).map((goal) => (
                        <div
                            key={goal}
                            onClick={() => setShowGoal(goal)}
                            className={`${showGoal === goal ? "bg-white border-2 border-black text-gray-800" : "bg-gray-800 text-white"} p-2 rounded-lg hover:scale-110 hover:cursor-pointer m-2`}
                        >
                            {goal.toLowerCase()}
                        </div>
                    ))}
                      
                      <div className='flex'>
                        <h1 onClick={() => setShowAddGoal(true)} className='text-bold bg-red-800 hover:cursor-pointer text-white m-2 p-4 rounded-lg'>Add a New Goal</h1>
                    </div>
                    </div>
                  
                    
                            <h2 className='bg-blue-700 p-2 w-1/2 self-center text-center rounded-md text-white'>Average: {avg} Minutes</h2>

                            <Line className='self-center mt-10' data={goalChartData} options={goalOptions} />
                        </div>
                        </div>


                    );
                })}
            </div>
            {/*
                 <div className='bg-white flex'>
                <div className='w-1/4'>
                    <h2>Pie Chart Example</h2>
                    <Pie data={data} options={pieOptions} />
                </div>
                <div>
                   
                </div>
            </div>
            */}
           
        </div>
        </>
        
    );
};

export default Charts;
