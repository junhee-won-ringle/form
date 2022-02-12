import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { updateQTitle, updateQDesc, updateQType, makeOption } from "./formSlice";
import '../App.scss';
import TextField from '@mui/material/TextField';
import AddOptionButton from './addOptionButton';
import AddQuestionButton from './addQuestionButton';

export default function Questions() {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.form.questions)

  const handleQuestionText = (uuid :string, key : string, text : string) => {
    const index : number = questions.findIndex(obj => obj.uuid === uuid);
    if (index === -1) {
      return;
    } else {
      if (key === "title") {
        dispatch(updateQTitle({
          index: index,
          title: text
        }));
      } else if (key === "desc") {
        dispatch(updateQDesc({
          index: index,
          desc: text
        }))
      } else {
        dispatch(updateQType({
          index: index,
          type: text
        }))
      }
    }
  }

  return (
    <div className='questionBox'>
      {questions.map((question, index) => {
        const uuid : string = question.uuid;
        return (
          <div className='question' key={index}>
            <TextField
              className="qTitle"
              id="questionTitle"
              label="Title"
              variant="standard"
              onChange={(e) => handleQuestionText(uuid, "title", e.target.value)}
            />
            <TextField
              className="qTitle"
              id="questionDesc"
              label="Desc"
              variant="standard"
              onChange={(e) => handleQuestionText(uuid, "desc", e.target.value)}
            />
            <AddOptionButton />
          </div>
        )
      })}
      <AddQuestionButton />
    </div>
  )
}