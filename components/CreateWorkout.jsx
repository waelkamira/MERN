'use client';
import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutContext';

export default function CreateWorkout() {
  const { dispatch } = useWorkoutsContext();
  const [error, setError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [workout, setWorkout] = useState({
    title: '',
    load: '',
    reps: '',
  });

  async function createWorkout(e) {
    e.preventDefault();
    setEmpty(true);
    // console.log(workout);

    if (workout.title !== '' && workout.load !== '' && workout.reps !== '') {
      const response = await fetch('http://localhost:4000/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workout),
      });

      const json = await response.json();
      if (response.ok) {
        // console.log(json);
        setError('');
        setWorkout({ title: '', load: '', reps: '' });
        dispatch({ type: 'CREATE_WORKOUT', payload: json });
        setEmpty(false);
      } else {
        console.log('emptyFields', json.emptyFields);
        setEmptyFields(json.emptyFields);
      }
    } else {
      setError('All Fields Are Required');
      return;
    }
  }

  return (
    <div className="h-full my-12">
      <h1>Add a New Workout</h1>
      <form
        onSubmit={createWorkout}
        className="flex flex-col items-start justify-start gap-2"
      >
        <h1 className="my-4">Exercise Title:</h1>
        <input
          id="Title"
          name="Title"
          className={
            (empty && workout.title === ''
              ? 'border border-solid border-red-400'
              : 'border') + ' text-xl p-2'
          }
          type="text"
          value={workout.title}
          onChange={(e) => setWorkout({ ...workout, title: e.target.value })}
        />
        <h1 className="my-4">Load (in Kg):</h1>
        <input
          id="load"
          name="load"
          className={
            (empty && workout.load === ''
              ? 'border border-solid border-red-400'
              : 'border') + ' text-xl p-2'
          }
          type="number"
          value={workout.load}
          onChange={(e) => setWorkout({ ...workout, load: e.target.value })}
        />
        <h1 className="my-4">Reps:</h1>
        <input
          id="reps"
          name="reps"
          className={
            (empty && workout.reps === ''
              ? 'border border-solid border-red-400'
              : 'border') + ' text-xl p-2'
          }
          type="number"
          value={workout.reps}
          onChange={(e) => setWorkout({ ...workout, reps: e.target.value })}
        />

        <button
          className="border rounded-lg p-2 bg-green-500 text-white hover:bg-green-600"
          type="submit"
        >
          Add Workout
        </button>
        {error && <h1 className="text-red-400">{error}</h1>}
      </form>
    </div>
  );
}
