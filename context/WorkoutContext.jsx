'use client';

import { createContext, useReducer } from 'react';
function workoutsReducer(currentState, action) {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload,
      };

    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...currentState.workouts],
      };

    case 'DELETE_WORKOUT':
      // console.log(currentState);
      // console.log(action.payload);

      return {
        workouts: currentState.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };

    default:
      return currentState;
  }
}

//? 1- تمثل حالة  context قمنا بانشاء
//? 2- داخله children لمشاركة هذه الحالة مع كافة المشروع عبر تمرير ال  WorkoutsContextProvider قمنا بانشاء
//? 3- حتى نستطيع تعديل هذه الحالة وتحديثها من اي مكان داخل المشروعuseReducer باستخدام Reducer قمنا بانشاء
//? 4- Context كقيمة لهذه الحالة او  Reducer من ال dispatch و state قمنا بتمرير ال

export const workoutContext = createContext();
export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });
  // console.log('state', state);
  return (
    <workoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </workoutContext.Provider>
  );
};
