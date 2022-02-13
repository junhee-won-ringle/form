import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Form {
  title: string;
  desc: string;
  questions: Array<Question>;
}

export interface Question {
  // 삭제나 생성시 index가 변하기 때문에 uuid 사용
  uuid: string;
  title: string;
  desc: string;
  
  /**
   * type
   *  = radio or checkbox: options 렌더링
   *  = text: text가 렌더링
  */
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

    // Question의 title, desc, type, text을 update하거나 해당 queston을 delete 하는 함수
    updateQuestion: (state, action) => {
      const index = state.questions.findIndex(obj => obj.uuid === action.payload.uuid);

      // findIndex는 해당 조건을 만족하는 item이 없으면 -1을 return한다.
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

    // option desc를 업데이트하거나 delete하는 함수
    updateOption: (state, action) => {

      // 예외 처리
      const index = state.questions.findIndex(obj => obj.uuid === action.payload.qUuid);
      if (index === -1) {
        return;
      }

      // 예외 처리
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

      // 예외 처리
      if (index === -1) {
        return;
      }
      if (action.payload.type === 'radio') {

        // radio는 하나만 체크 가능하기 때문에 나머지의 checked를 false로
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

        // checkbox는 다시 누르면 체크가 취소됨
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