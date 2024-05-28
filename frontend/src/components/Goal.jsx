import { formatDistanceToNow } from 'date-fns';

const GoalComponent = ({ goal }) => {
  if (!goal || !goal.deadline) {
    return null;
  }

  const deadlineDate = new Date(goal.deadline);
  const formattedDeadline = deadlineDate.toLocaleDateString();

  const timeRemaining = formatDistanceToNow(deadlineDate, { addSuffix: true });

  return (
    <div>
      <p className='text-center font-bold'>Deadline</p>
      <p>{formattedDeadline}</p>
      <p>{timeRemaining}</p>
    </div>
  );
};

export default GoalComponent;