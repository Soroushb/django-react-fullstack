import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../api';
import Chart from 'chart.js/auto';
import { IoIosClose } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";


const Charts = () => {
    const [date, setDate] = useState("");
    const [goalName, setGoalName] = useState("");
    const [addGoalName, setAddGoalName] = useState("")
    const [mins_done, setMins_done] = useState(0);
    const [goalTimes, setGoalTimes] = useState({});
    const [showGoal, setShowGoal] = useState("");
    const [showAddGoal, setShowAddGoal] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false)
    const [showAddMobile, setShowAddMobile] = useState(false)

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

    // const deleteGoalLog = async (id) => {

    //     try{
    //     const res = await api.delete(`/api/goal-logs/${id}/delete/`)
    //     if(res === 204)alert("Activity Deleted")
    //     getGoalList()
    //     }catch(err){
    //         alert(err)
    //     } 
    // }

    const formatDateForServer = (date) => {
        const dateObj = new Date(date);
        return dateObj.toISOString().split('T')[0];
    };

    const addUserGoal = async (newGoalName) => {

        const finalGoalName = newGoalName ? newGoalName : goalName
        const formattedDate = formatDateForServer(date);
        const existingGoal = Object.values(goalTimes).flatMap(item => item)
            .find(item => item.date === formattedDate && item.name === finalGoalName);

        if (existingGoal) {
            const goalType = Object.keys(goalTimes).find(key =>
                goalTimes[key].some(item => item.date === formattedDate && item.name === finalGoalName)
            );
            const updatedGoalTimes = { ...goalTimes };
            updatedGoalTimes[goalType] = updatedGoalTimes[goalType].map(item =>
                item.date === formattedDate && item.name === finalGoalName ? { ...item, mins_done } : item
            );
            setGoalTimes(updatedGoalTimes);
            await api.put(`/api/goal-logs/${existingGoal.id}/`, { mins_done, date: formattedDate, name: finalGoalName })
                .catch((err) => console.log(err));
        } else {
            api.post(`/api/goal-logs/`, { name: finalGoalName, date: formattedDate, mins_done })
                .then((res) => {
                    console.log("New goal added:", res.data);
                    setGoalName(""); // Clear the input field
                    getGoalList();
                    alert(`New ${finalGoalName} added.`);
                })
                .catch((err) => {
                    console.error("Error adding new goal:", err);
                });
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
                            <div>
                            

                        {showAddMobile && (

<form onSubmit={(e) => {
    e.preventDefault();
    setGoalName(showGoal);
    addUserGoal(addGoalName);
}}>
    <div className='flex justify-between'>
    <div className='text-bold text-lg mb-4'>Add a  New Goal</div>
    <div onClick={() => setShowAddMobile(false)} className='text-white h-full bg-red-500 p-1 rounded-full hover:bg-red-700 hover:cursor-pointer'><IoIosClose /></div>
    </div>
    <div className='flex flex-col items-center'>
        <div>

            <label className='text-sm'>Name:</label>
            <input onChange={(e) => setAddGoalName(e.target.value)} value={addGoalName} name='name' type='text' />
            <label className='text-sm'>Minutes Done:</label>
            <input onChange={(e) => setMins_done(parseInt(e.target.value, 10))} value={mins_done} name='mins_done' type='number' />
            <label className='text-sm'>Date:</label>
            <div className='flex'>
            <input onChange={(e) => setDate(e.target.value)} value={date} name='date' type='date' />
            <div className='flex justify-center align-middle items-center'>
                        <button onClick={(e) => {
                            e.preventDefault();
                            handleTodayClick();
                        }} className='border-red-900 m-2 border-2 text-sm flex items-center justify-center rounded-md h-1/2'>
                            <p className='p-2'>Today</p>
                        </button>
            </div>
            </div>
            <button type='submit' className='text-bold bg-red-800 text-white p-4 rounded-md'>Add a New Goal</button>
        </div>
    </div>
</form>
                        )}
                    
                            
                            <div className='flex flex-col justify-center'>
                            <div className='flex justify-center m-3'>
                            <button onClick={() => setShowAddMobile(true)} className='p-2 bg-red-700 rounded-md text-white font-secondary hover:scale-105'>Add Activity</button>
                            </div>
                            <h1 className='flex hover:cursor-pointer text-white shadow-lg p-4 mt-4 hover:scale-110'  onClick={() => setShowDropDown(!showDropDown)}>Select an activity <IoMdArrowDropdown className='mt-1 text-blue-800 ml-1 scale-150'/></h1>
                            
                            </div>
                            {showDropDown && (
                                <div className='absolute bg-white shadow-lg'>
                                {Object.keys(goalTimes).map((goal) => (
                                    <>
                                    <div
                                        key={goal}
                                        onClick={() => {setShowGoal(goal); setShowDropDown(false)}}
                                        className={`${showGoal === goal ? "bg-white border-2 border-black text-gray-800" : " text-gray-800"} flex items-center p-2 rounded-lg hover:scale-110 hover:cursor-pointer m-2`}
                                    >
                                        {goal.toLowerCase()}
                                    </div>
                                    
                                    </>
                                ))}
                                  
                                  </div>
                            )}
                            </div>
                            <div className='flex justify-center text-center text-2xl hover:scale-110  bg-blue-800 text-white rounded-md p-3 hover:cursor-pointer'>{goalName.toUpperCase().slice(0,14)}{goalName.length > 15 ? (<>...</>) : (<></>)}</div>
                            {avg && (<h2 className='bg-blue-700 p-2 w-1/2 self-center m-2 text-center rounded-md text-white'>Average: <br/> {avg} Minutes</h2>)}

                            <Line className='self-center bg-slate-800 mt-10' data={goalChartData} options={goalOptions} />
                            </div>
                            
                           {!showAddGoal && (

                            <div className='m-4 scale-75'>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    setGoalName(showGoal);
                                    addUserGoal(addGoalName);
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


                            </div>)}
                        </div>
                    );
                })}
            </div>
        </div>
        {console.log(Object.keys(goalTimes))}
        {Object.keys(goalTimes).length > 0  ? (
            <div className="container hidden lg:block xl:block  mx-auto pl-10 pr-10 pb-20 pt-20">
            
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
                        addUserGoal(addGoalName);
                    }}>
                        <div className='flex justify-between'>
                        <div className='text-bold text-xl mb-4'>Add a New Goal</div>
                        <div onClick={() => setShowAddGoal(false)} className='text-white h-full bg-red-500 p-1 rounded-full scale-150 hover:bg-red-700 hover:cursor-pointer'><IoIosClose /></div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div>

                                <label>Name:</label>
                                <input onChange={(e) => setAddGoalName(e.target.value)} value={addGoalName} name='name' type='text' />
                                <label>Minutes Done:</label>
                                <input onChange={(e) => setMins_done(parseInt(e.target.value, 10))} value={mins_done} name='mins_done' type='number' />
                                <label>Date:</label>
                                <div className='flex'>
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
                                <button type='submit' className='text-bold bg-red-800 text-white p-4 rounded-md'>Add a New Goal</button>
                            </div>
                        </div>
                    </form>
                )}
              </div>    

                            {!showAddGoal && (
                            <div className='m-4'>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    setGoalName(showGoal);
                                    addUserGoal(addGoalName);
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
                            )}
                            </div>

                            <div className='flex flex-col w-full'>
                            <div className='flex lg:flex-row flex-col m-8 justify-between items-center p-4'>
                            <div>
                            <h1 className='flex hover:cursor-pointer shadow-lg p-4 hover:scale-110'  onClick={() => setShowDropDown(!showDropDown)}>Select an activity <IoMdArrowDropdown className='mt-1 text-blue-800 ml-1 scale-150'/></h1>
                            {showDropDown && (
                                <div className='absolute bg-white shadow-lg'>
                                {Object.keys(goalTimes).map((goal) => (
                                    <>
                                    <div
                                        key={goal}
                                        onClick={() => {setShowGoal(goal); setShowDropDown(false)}}
                                        className={`${showGoal === goal ? "bg-white border-2 border-black text-gray-800" : " text-gray-800"} flex items-center p-2 rounded-lg hover:scale-110 hover:cursor-pointer m-2`}
                                    >
                                        {goal.toLowerCase()}
                                    </div>
                                    
                                    </>
                                ))}
                                  
                                  </div>
                            )}
                            </div>
                            
                            <div className='relative text-2xl hover:scale-110 bg-blue-800 text-white rounded-md p-3 hover:cursor-pointer flex items-start'>
  <span className='flex-1'>
    {goalName.toUpperCase().slice(0, 14)}
  </span>
  {goalName.length > 15 && (
    <span>
      ...
    </span>
  )}
  <div className='absolute top-0 right-0'>
  </div>
</div>
                    <div className=''>
                        <h1 onClick={() => setShowAddGoal(true)} className='text-bold bg-red-800 hover:cursor-pointer hover:scale-110 text-white m-2 p-4 rounded-lg'>Add a New Goal</h1>
                    </div>
                    </div>
                
                    {avg && (<h2 className='bg-blue-700 p-2 w-1/2 self-center m-2 text-center rounded-md text-white'>Average: <br/> {avg} Minutes</h2>)}

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
        ) : (
    <>
    <div className='m-12 lg:flex justify-between'>
        <div className='m-4 hidden lg:flex justify-between self-start align-middle'>
            <div className='flex flex-col'>
            <h1 className='text-white flex justify-center mb-6 text-2xl font-primary'>Add Activity</h1>
            <form onSubmit={(e) => {
                        e.preventDefault();
                        setGoalName(showGoal);
                        addUserGoal(addGoalName);
                    }}>
                        <div className='flex justify-between'>
                        <div className='text-bold text-xl mb-4'>Add a New Goal</div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div>

                                <label>Name:</label>
                                <input onChange={(e) => setAddGoalName(e.target.value)} value={addGoalName} name='name' type='text' />
                                <label>Minutes Done:</label>
                                <input onChange={(e) => setMins_done(parseInt(e.target.value, 10))} value={mins_done} name='mins_done' type='number' />
                                <label>Date:</label>
                                <input onChange={(e) => setDate(e.target.value)} value={date} name='date' type='date' />
                                <div className='flex justify-center align-middle items-center'>
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                handleTodayClick();
                                            }} className='border-red-900 m-2 border-2  flex items-center justify-center rounded-md h-1/2'>
                                                <p className='p-2'>Today</p>
                                            </button>
                                </div>
                                <button type='submit' className='text-bold bg-red-800 text-white p-4 rounded-md'>Add a New Goal</button>
                            </div>
                        </div>
                    </form>
            </div>
            
        </div>
        <div className='m-4 lg:hidden justify-center self-start align-middle'>
            <h1 className='text-white flex justify-center mb-6 text-2xl font-primary'>Add Activity</h1>
            <form onSubmit={(e) => {
                        e.preventDefault();
                        setGoalName(showGoal);
                        addUserGoal(addGoalName);
                    }}>
                        <div className='flex justify-between'>
                        <div className='text-bold text-xl mb-4'>Add a New Goal</div>
                        <div onClick={() => setShowAddGoal(false)} className='text-white h-full bg-red-500 p-1 rounded-full scale-150 hover:bg-red-700 hover:cursor-pointer'><IoIosClose /></div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div>

                                <label>Name:</label>
                                <input onChange={(e) => setAddGoalName(e.target.value)} value={addGoalName} name='name' type='text' />
                                <label>Minutes Done:</label>
                                <input onChange={(e) => setMins_done(parseInt(e.target.value, 10))} value={mins_done} name='mins_done' type='number' />
                                <label>Date:</label>
                                <input onChange={(e) => setDate(e.target.value)} value={date} name='date' type='date' />
                                
                                <button type='submit' className='text-bold bg-red-800 text-white p-4 rounded-md'>Add a New Goal</button>
                                
                            </div>
                        </div>
                    </form>
        </div>
        <div className='text-3xl h-screen font-secondary text-white m-20'>
            No Activity  
        </div>
    </div>
    </>

        )}
        
        </>
        
    );
};

export default Charts;
