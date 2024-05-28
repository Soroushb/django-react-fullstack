import { useEffect, useState } from 'react';
import api from '../api';
import Goal from '../components/Goal'; 

const Deadlines = () => {
  const [goals, setGoals] = useState([]);
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    getGoals();
  }, []);

  const getGoals = () => {
    api.get('api/goals/')
      .then((res) => setGoals(res.data))
      .catch((err) => console.log(err));
  };

  const deleteGoal = (id) => {
    api.delete(`api/goals/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert('Goal was deleted.');
          getGoals(); 
        } else {
          alert('Failed to delete the goal.');
        }
      })
      .catch((error) => alert(error));
  };

  const createGoal = (e) => {
    e.preventDefault();
    api.post('api/goals/', { name, deadline })
      .then((res) => {
        if (res.status === 201) {
          alert('New Goal was added.');
          getGoals(); 
          setName(''); 
          setDeadline('');
        } else {
          alert('Failed to create a goal.');
        }
      })
      .catch((error) => alert(error));
  };

  const updateGoal = (e) => {

  }

  return (
    <div className='flex flex-col container items-center mx-auto lg:h-400 justify-center'>
      <h1 className='text-white m-12  text-4xl'>Your Goals</h1>
      <div className='flex w-full'>
      <div>
      <form onSubmit={createGoal} className='mb-4'>
        <div className='mb-4'>
          <h1 className='text-2xl text-center text-blue-900 p-2 rounded-lg'>Add a Goal</h1>
          <label htmlFor='name' className='block text-black mb-2'>Goal Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='p-2 border border-gray-300 rounded-md w-full'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='deadline' className='block text-black mb-2'>Deadline:</label>
          <input
            type='date'
            id='deadline'
            name='deadline'
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className='p-2 border border-gray-300 rounded-md w-full'
            required
          />
        </div>
        <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded-md'>Add Goal</button>
      </form>
      </div>
      
        <div className='grid grid-cols-2 w-full'>
        {goals.map((goal) => (
        <div key={goal.id} className='flex justify-center w-full'>
          <div className='flex flex-col rounded-lg m-2 bg-white w-4/5'>
            <Goal goal={goal} onDelete={deleteGoal} />
          </div>
        </div>
      ))}

        </div>
      
      </div>
      
    </div>
  );
};

export default Deadlines;
