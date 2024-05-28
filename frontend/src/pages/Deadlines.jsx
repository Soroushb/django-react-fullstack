import { useEffect, useState } from 'react';
import api from '../api';
import Goal from '../components/Goal';
import { IoIosClose } from 'react-icons/io';

const Deadlines = () => {
  const [goals, setGoals] = useState([]);
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // 'YYYY-MM-DD'

  useEffect(() => {
    getGoals();
  }, []);

  const getGoals = () => {
    api.get('api/goals/')
      .then((res) => res.data)
      .then((data) => setGoals(data))
      .catch((err) => console.log(err));
  };

  const deleteGoal = (id) => {
    api.delete(`api/goals/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert('Goal was deleted.');
          getGoals(); // Fetch the updated list of goals after deletion
        } else {
          alert('Failed to delete the goal.');
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <div className='flex flex-col container items-center mx-auto lg:h-400 justify-center'>
      <h1 className='text-white mt-12 text-4xl'>Your Goals</h1>
      {goals.map((goal) => (
        <div key={goal.id} className='flex justify-between w-full'>
          <div className='flex justify-between rounded-e-lg m-2 bg-white w-4/5'>
            <div className='flex items-center justify-center m-4 h-20 rounded-md w-4/5'>
              {goal.name}
            </div>
            <div
              onClick={() => {
                deleteGoal(goal.id);
                console.log(goal.id);
              }}
              className='text-red-900 scale-150 mt-5 hover:cursor-pointer'
            >
              <IoIosClose />
            </div>
          </div>
          <div>
            <div className='flex items-center justify-center m-4 h-20 bg-white rounded-md w-4/5'>
              <div className='flex flex-col justify-center'>
                <Goal goal={goal} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Deadlines;
