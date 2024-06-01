import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { IoIosClose } from 'react-icons/io';


const Goal = ({ goal, onDelete, onUpdate }) => {

  const [name, setName] = useState("")
  const [deadline, setDeadline] = useState("")
  const [isFinished, setIsFinished] = useState(false)


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
    <div className='flex flex-col'>
      <div className='flex w-full justify-between'>
        <div className='font-bold text-3xl p-3'>
        {goal?.name}
        </div>
        <div
        onClick={() => onDelete(goal.id)}
        className='text-red-900 p-3 scale-150 hover:cursor-pointer'
        >
        <IoIosClose />
      </div>
      </div>
      <div className='flex flex-col justify-center items-center w-full'>
      <p className='text-center font-bold'>Deadline</p>
      <p>{formattedDeadline}</p>
      <p>Deadline {timeRemaining}</p>
      <div className='bg-blue-900 text-white p-1.5 rounded-lg mt-1 hover:cursor-pointer'>Update Goal</div> 
      <div>
        <label>Deadline:</label>
        <input onChange={(e) => {}} type='date' name='deadline' value={deadline} />

      </div>
      {isFinished && (<p className='text-red-900'>Deadline has passed.</p>)}
      <div className='p-4 w-full'>
        <progress className='w-full rounded-lg' value={progressPercentage} max="100" />
      </div>
      
      </div>
     
      
    </div>
  );
};

export default Goal;
