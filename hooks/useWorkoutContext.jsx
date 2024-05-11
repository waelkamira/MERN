import { workoutContext } from '../context/WorkoutContext';
import { useContext } from 'react';

export const useWorkoutsContext = () => {
  const context = useContext(workoutContext);
  if (!context) {
    throw Error('useWorkoutsContext must be inside a WorkoutContextProvider');
  }
  return context;
};
