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
}

export interface Option {
  uuid: string;
  desc: string;
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
          desc: "default description"
        }, {
          uuid: uuidv4(),
          desc: "default description"
        }]
      })
    },
    updateQTitle: (state, action) => {
      state.questions[action.payload.index].title = action.payload.title
    },
    updateQDesc: (state, action) => {
      state.questions[action.payload.index].desc = action.payload.desc
    },
    updateQType: (state, action) => {
      state.questions[action.payload.index].type = action.payload.type
    },
    makeOption: (state, action) => {
      state.questions[action.payload.index].options.push({
        uuid: uuidv4(),
        desc: "default description"
      })
    }
  },
});

export const {
  updateTitle, updateDesc, updateQTitle, updateQDesc, updateQType, makeQuestion,
  makeOption
} = formSlice.actions;

export default formSlice.reducer;