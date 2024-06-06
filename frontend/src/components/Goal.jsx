import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { IoIosClose } from 'react-icons/io';


const Goal = ({ goal, onDelete, onUpdate }) => {

  const [name, setName] = useState("")
  const [deadline, setDeadline] = useState("")
  const [isFinished, setIsFinished] = useState(false)
  const [showDeadline, setShowDeadline] = useState(false)
  const [error, setError] = useState(false)

  if (!goal || !goal.deadline || !goal.created_at) {
    return null;
  }

  const deadlineDate = new Date(goal.deadline);
  const createdDate = new Date(goal.created_at);
  const formattedDeadline = deadlineDate.toLocaleDateString();

  const totalDuration = deadlineDate - createdDate;
  const elapsedTime = new Date() - createdDate;
  const progressPercentage = (elapsedTime / totalDuration) * 100;

  const timeRemaining = formatDistanceToNow(deadlineDate, { addSuffix: true });
  console.log(progressPercentage)

  useEffect(() => {
    if (progressPercentage > 100) {
      setIsFinished(true);
    }
  }, [progressPercentage]);

  return (
    <div className='flex flex-col  text-white bg-slate-800'>
      <div className='flex w-full justify-between'>
        <div className='font-bold text-3xl font-secondary p-3'>
        {goal?.name}
        </div>
        <div
        onClick={() => onDelete(goal.id)}
        className='text-white p-3 scale-150 font-secondary hover:cursor-pointer'
        >
        <IoIosClose />
      </div>
      </div>
      <div className='flex flex-col justify-center items-center w-full'>
      <p className='text-center font-secondary font-bold'>Deadline</p>
      <p>{formattedDeadline}</p>
      <p>Deadline {timeRemaining}</p>
      {!showDeadline && <div onClick={() => setShowDeadline(true)} className='bg-blue-900 font-secondary text-white p-1.5 rounded-lg mt-1 hover:cursor-pointer'>Update Goal</div> }
      <div>
        {showDeadline && (
          <>
            <div className='flex flex-col'>
            <div>
            {error &&   <div className='text-red-500 flex text-center text-small'>Please check your inputs</div>}
            <label className='font-secondary'>Name:</label>
            <input  required onChange={(e) => {setName(e.target.value)}} className='m-2 font-secondary rounded-md text-black p-1' type='text' name='name' value={name} />
            </div>
            <div>
            <label className='font-secondary'>Deadline:</label>
            <input onChange={(e) => {
              const newDate = new Date(e.target.value).toISOString().split('T')[0]
              if(newDate > new Date().toISOString().split('T')[0]) {
                setDeadline(e.target.value)
              }else{
                setError(true)
              }
              }} className='m-2 font-secondary bg-blue-500 rounded-md' type='date' name='deadline' value={deadline} />
            </div>
            <div className='flex justify-between p-2'>
            <div onClick={() => {onUpdate({id: goal?.id, name, deadline}); !name || !deadline ? setError(true) : setShowDeadline(false)}} className='bg-blue-900 w-25 text-white p-1.5 font-secondary rounded-lg mt-1 hover:cursor-pointer'>Update Goal</div> 
            <div onClick={() => setShowDeadline(false)} className='rounded-md bg-gray-200 text-gray-800 shadow-sm p-2 font-secondary hover:cursor-pointer'>Cancel</div>
            </div>
            </div>
           
          </>
        )}
        

      </div>
      {isFinished && (<p className='text-white'>Deadline has passed.</p>)}
      <div className='p-4 w-full'>
        <progress className='w-full rounded-lg' value={progressPercentage} max="100" />
      </div>
      
      </div>
     
      
    </div>
  );
};

export default Goal;
