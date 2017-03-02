import {
  FIELD_NAMES, FIELDS, getTextTemplate,
} from './constants';


// Action types
// ----------------------------------------------------------------------------

export const SUBMIT_FIELD = 'MADLIBS.SUBMIT_FIELD';
export const SUBMIT_ESSAY = 'MADLIBS.SUBMIT_ESSAY';
export const INCREMENT_COUNTER = 'MADLIBS.INCREMENT_COUNTER';


// Initial state
// ----------------------------------------------------------------------------

export const INITIAL_STATE = {
  fieldOrder: [
    FIELD_NAMES.hometown,
    FIELD_NAMES.favoriteFood,
    FIELD_NAMES.loveToDo,
    FIELD_NAMES.music,
    FIELD_NAMES.messageIf,
    FIELD_NAMES.bar,
  ],
  fields: FIELDS,
  fieldAnswers: {},
  essayText: '',
  counter: 1,
};


// Reducer
// ----------------------------------------------------------------------------

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUBMIT_FIELD: {
      console.log('submitting', action);
      console.log('current state submmit', state);
      const newStateField = state.fieldAnswers;
      newStateField[action.fieldName] = action.answer;
      return Object.assign({}, state,
        {
          fieldAnswers: newStateField,
          // counter: state.counter + 1,
        }
      );
    }

    case SUBMIT_ESSAY: {
      console.log('submitting essay');
      const newAnswer = state.fieldAnswers[action.fieldName];
      const textarr = getTextTemplate(action.fieldName);
      console.log(state.fieldAnswers[action.fieldName]);

      const min = Math.ceil(0);
      const max = Math.floor(textarr.length);
      const randomIndex = Math.floor(Math.random() * (max - min)) + min;
      console.log('Random index', randomIndex);
      const randstring = textarr[randomIndex];
      const newAnswerHTML = `<b> ${newAnswer} </b>`;
      let parsedTemplate = randstring.replace('$answer', newAnswerHTML);
      console.log('current text ', state);
      parsedTemplate = state.essayText + parsedTemplate;
      return Object.assign({}, state,
        {
          essayText: parsedTemplate,
          counter: state.counter + 1,
        }
      );
    }

    case INCREMENT_COUNTER: {
      return Object.assign({}, state,
        {
          counter: state.counter + 1,
        }
      );
    }

    default:
      return state;
  }
}


// Action creators
// ----------------------------------------------------------------------------

export function submitField({ id, answer }) {
  return { type: SUBMIT_FIELD, fieldName: id, answer };
}

export function submitEssay({ id, answer }) {
  return { type: SUBMIT_ESSAY, fieldName: id, answer };
}

export function increment() {
  return { type: INCREMENT_COUNTER };
}
