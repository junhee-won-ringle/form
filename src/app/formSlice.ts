import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Form {
  title: string;
  desc: string;
  questions: Array<Question>;
}

export interface Question {
  uuid: string;
  title: string;
  desc: string;
  type: string;
  options: Array<Option>;
  text: string;
}

export interface Option {
  uuid: string;
  desc: string;
  checked: boolean;
}

const initialState: Form = {
  title: "default title",
  desc: "default description",
  questions: []
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload
    },
    updateDesc: (state, action) => {
      state.desc = action.payload
    },
    makeQuestion: (state) => {
      state.questions.push({
        uuid: uuidv4(),
        title: "default title",
        desc: "default description",
        type: "radio",
        options: [{
          uuid: uuidv4(),
          desc: "",
          checked: false
        }, {
          uuid: uuidv4(),
          desc: "",
          checked: false
        }],
        text: "default text"
      })
    },
    updateQuestion: (state, action) => {
      const index = state.questions.findIndex(obj => obj.uuid === action.payload.uuid);
      if (index !== -1) {
        if (action.payload.key === 'title') {
          state.questions[index].title = action.payload.data;
        } else if (action.payload.key === 'desc') {
          state.questions[index].desc = action.payload.data;
        } else if (action.payload.key === 'type') {
          state.questions[index].type = action.payload.data;
          for (let iter = 0; iter < state.questions[index].options.length; iter++) {
            state.questions[index].options[iter].checked = false;
          }
        } else if (action.payload.key === 'delete') {
          state.questions.splice(index, 1);
        } else {
          state.questions[index].text = action.payload.data;
        }
      }
    },
    makeOption: (state, action) => {
      const index = state.questions.findIndex(obj => obj.uuid === action.payload.qUuid);
      if (index === -1) {
        return;
      }
      state.questions[index].options.push({
        uuid: uuidv4(),
        desc: "",
        checked: false
      })
    },
    updateOption: (state, action) => {
      const index = state.questions.findIndex(obj => obj.uuid === action.payload.qUuid);
      if (index === -1) {
        return;
      }
      const optionIndex = state.questions[index].options.findIndex(
        obj => obj.uuid === action.payload.optionUuid);
      if (index === -1) {
        return;
      }

      if (action.payload.key === 'desc') {
        state.questions[index].options[optionIndex].desc = action.payload.data;
      } else {
        state.questions[index].options.splice(optionIndex, 1);
      }
    },
    checkOption: (state, action) => {
      const index = state.questions.findIndex(obj => obj.uuid === action.payload.qUuid);
      if (index === -1) {
        return;
      }
      if (action.payload.type === 'radio') {
        for (let iter = 0; iter < state.questions[index].options.length; iter++) {
          if (state.questions[index].options[iter].uuid === action.payload.optionUuid) {
            state.questions[index].options[iter].checked = true;
          } else {
            state.questions[index].options[iter].checked = false;
          }
        }
      } else {
        const optionIndex = state.questions[index].options.findIndex(
          obj => obj.uuid === action.payload.optionUuid);
        if (optionIndex === -1) {
          return;
        }
        state.questions[index].options[optionIndex].checked = !state.questions[index].options[optionIndex].checked;
      }
    }
  },
});

export const {
  updateTitle, updateDesc, makeQuestion, updateQuestion,
  makeOption,updateOption , checkOption
} = formSlice.actions;

export default formSlice.reducer;