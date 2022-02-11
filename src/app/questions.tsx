import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { updateQTitle, updateQDesc, updateQType, makeOption } from "./formSlice";
import '../App.scss';
import TextField from '@mui/material/TextField';
import AddOptionButton from './addOptionButton';

export default function Questions() {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.form.questions)
  return (
    <div className='questionBox'>
      {questions.map((question, index) => {
        return (
          <div className='question' key={index}>
            <TextField
              className="titleText"
              id="mainTitle"
              label="Title"
              variant="standard"
              onChange={(e) => dispatch(updateTitle(e.target.value))}
            />
            hi
            <AddOptionButton />
          </div>
        )
      })}
    </div>
  )
}