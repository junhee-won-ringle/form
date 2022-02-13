import { useDispatch } from "react-redux";
import { makeQuestion } from "../app/formSlice";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import '../App.scss'

export default function AddQuestionButton() {
  const dispatch = useDispatch();
  return (
    <Fab
      className='addQuestionButton'
      color='secondary'
      onClick={() => dispatch(makeQuestion())}
    >
      <AddIcon />
    </Fab>
  )
}