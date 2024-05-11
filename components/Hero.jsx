'use client';
import React, { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutContext';
import { RxCross2 } from 'react-icons/rx';

export default function Hero() {
  const { workouts, dispatch } = useWorkoutsContext();
  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const res = await fetch('http://localhost:4000/api/workouts');
    const json = await res.json();
    if (res.ok) {
      dispatch({ type: 'SET_WORKOUTS', payload: json });
    }
  };

  async function deleteWorkout(id) {
    // console.log(id);
    const res = await fetch(`http://localhost:4000/api/workouts/${id}`, {
      method: 'DELETE',
    });
    const json = await res.json();

    if (res.ok) {
      console.log('json', json);
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  }

  return (
    <div className="p-8 h-screen">
      {workouts?.length > 0 &&
        workouts.map((workout) => (
          <div className="border rounded-lg hover:shadow-lg my-4 p-4 bg-white">
            <div className="flex justify-end">
              <RxCross2
                className="text-xl hover:scale-125 text-green-500"
                onClick={() => deleteWorkout(workout._id)}
              />
            </div>
            <h1 className="text-green-500 font-bold">{workout?.title}</h1>
            <h1 className="">Load(kg): {workout?.load}</h1>
            <h1 className="">Reps: {workout?.reps}</h1>
            <h1 className="">{workout?.createdAt.slice(0, 10)}</h1>
          </div>
        ))}
    </div>
  );
}
