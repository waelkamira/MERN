'use client';
import React, { useEffect, useState } from 'react';

export default function Hero() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const res = await fetch('http://localhost:4000/api/workouts');
    const json = await res.json();
    if (res.ok) {
      setWorkouts(json);
      console.log(json);
    }
  };

  return (
    <div className="p-8 h-screen">
      {workouts?.length > 0 &&
        workouts.map((workout) => (
          <div className="border rounded-lg hover:shadow-lg my-4 p-4 bg-white">
            {/* <h1 className="">The Title Is: {workout?.title}</h1> */}
            <h1 className="text-green-500 font-bold">Situps</h1>
            <h1 className="">Load(kg): {workout?.load}</h1>
            <h1 className="">Reps: {workout?.reps}</h1>
            <h1 className="">{workout?.createdAt.slice(0, 10)}</h1>
          </div>
        ))}
    </div>
  );
}
