import {
  FIELD_NAMES, FIELDS, getTextTemplate,
} from './constants';


// Action types
// ----------------------------------------------------------------------------

export const SUBMIT_FIELD = 'MADLIBS.SUBMIT_FIELD';
export const SUBMIT_ESSAY = 'MADLIBS.SUBMIT_ESSAY';
export const SUBMIT_EDIT = 'MADLIBS.SUBMIT_EDIT';
export const SUBMIT_START_OVER = 'MADLIBS.SUBMIT_START_OVER';
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
  essayList: {},
  allBlurred: 0,
  showEdit: false,
  counter: 1,
  flushed: false,
};


// Reducer
// ----------------------------------------------------------------------------

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUBMIT_START_OVER: {
      // console.log('start over');
      return Object.assign({}, state,
        {
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
          essayList: {},
          allBlurred: 0,
          showEdit: false,
          counter: 1,
          flushed: true,
        }
      );
    }
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
    case SUBMIT_EDIT: {
      console.log('submitting EDIT', action);
      console.log('current state submmit', state);
      // const newStateField = state.fieldAnswers;
      // newStateField[action.fieldName] = action.answer;
      return Object.assign({}, state,
        {
          showEdit: true,
          // counter: state.counter + 1,
        }
      );
    }

    case SUBMIT_ESSAY: {
      // console.log('submitting essay');
      const newAnswer = state.fieldAnswers[action.fieldName];
      const textarr = getTextTemplate(action.fieldName);
      // console.log('>>>', state.fieldAnswers[action.fieldName]);

      const min = Math.ceil(0);
      const max = Math.floor(textarr.length);
      const randomIndex = Math.floor(Math.random() * (max - min)) + min;
      // console.log('Random index', randomIndex);
      const randstring = textarr[randomIndex];
      const newAnswerHTML = `<b> ${newAnswer} </b>`;
      const parsedTemplate = randstring.replace('$answer', newAnswerHTML);
      const newStateEssayList = state.essayList;
      newStateEssayList[action.fieldName] = parsedTemplate;
      // console.log('current text ', parsedTemplate);
      let orderedParsedTempalate = '';
      state.fieldOrder.map((key) => (
            orderedParsedTempalate += (state.essayList[key]) ? (state.essayList[key]) : ''
      ));
      // console.log('updated parsedTemplate', orderedParsedTempalate)

      return Object.assign({}, state,
        {
          essayList: newStateEssayList,
          essayText: orderedParsedTempalate,
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

export function submitEdit({ status }) {
  return { type: SUBMIT_EDIT, fieldName: status };
}

export function submitStartOver({ status }) {
  return { type: SUBMIT_START_OVER, fieldName: status };
}

export function increment() {
  return { type: INCREMENT_COUNTER };
}
