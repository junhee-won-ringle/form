import { useDispatch } from 'react-redux';
import { updateQuestion } from "../app/formSlice";
import '../App.scss';
import TextField from '@mui/material/TextField';

interface props {
  uuid: string
}

export default function OptionText(props: props) {
  const dispatch = useDispatch();

  return (
    <TextField
      className="optionText"
      id="optionText"
      label="text"
      variant="filled"
      multiline
      rows={4}
      onChange={(e) => dispatch(updateQuestion({
        uuid: props.uuid,
        key: "changeText",
        data: e.target.value
      }))}
    />
  )
}