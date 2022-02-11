import { useDispatch } from "react-redux";
import { updateTitle, updateDesc } from "./formSlice";
import '../App.scss'
import TextField from '@mui/material/TextField';

export default function Title() {
  const dispatch = useDispatch();
  return (
    <div className="title">
      <TextField
        className="titleText"
        id="mainTitle"
        label="Title"
        variant="standard"
        onChange={(e) => dispatch(updateTitle(e.target.value))}
      />
      <TextField
        className="titleText"
        id="mainDesc"
        label="Description"
        variant="standard"
        onChange={(e) => dispatch(updateDesc(e.target.value))}
      />
    </div>
  )
}