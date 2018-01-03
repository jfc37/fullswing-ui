import { StudentsState } from './students.state';
import { Actions, SET_STUDENTS } from './students.actions';

function getInitialState(): StudentsState {
  return {
    students: {}
  };
}

export function studentsReducer(state = getInitialState(), action: Actions): StudentsState {
  switch (action.type) {
    case SET_STUDENTS:
      const students = action.students.reduce((accum, c) => Object.assign({}, accum, { [c.id]: c }), {});
      return {
        ...state,
        students: {
          ...state.students,
          ...students
        }
      };

    default:
      return state;
  }
}
