import { ClassesState } from './classes.state';
import { Actions, SET_CLASSES } from './classes.actions';

function getInitialState(): ClassesState {
  return {
    classes: {}
  };
}

export function classesReducer(state = getInitialState(), action: Actions): ClassesState {
  switch (action.type) {
    case SET_CLASSES:
      const classes = action.classes.reduce((accum, c) => Object.assign({}, accum, { [c.id]: c }), {});
      return {
        ...state,
        classes: {
          ...state.classes,
          ...classes
        }
      };

    default:
      return state;
  }
}
