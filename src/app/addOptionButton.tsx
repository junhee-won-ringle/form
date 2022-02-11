import { useDispatch } from "react-redux";
import { makeQuestion } from "./formSlice";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import '../App.scss'

export default function AddOptionButton() {
  const dispatch = useDispatch();
  return(
    <Fab
      className='addOptionButton'
    >
      <AddIcon
        onClick={() => dispatch(makeQuestion())}
      />
    </Fab>
  )
}