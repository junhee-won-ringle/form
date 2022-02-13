import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { updateQuestion, makeOption } from "../app/formSlice";
import Option from './option';
import OptionText from './optionText';
import '../App.scss';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface props {
  uuid: string
}

export default function Question(props: props) {
  const dispatch = useDispatch();
  const [qType, setQType] = useState<string>('radio');
  const options= useSelector((state: RootState) => state.form.questions).find(
    (question) => question.uuid === props.uuid
  )?.options;
  
  const handleQType = (type: string) => {
    setQType(type);
    dispatch(updateQuestion({
      uuid: props.uuid,
      key: "type",
      data: type
    }))
  }

  return (
    <div className='question'>
      <TextField
        className="qTitle"
        id="questionTitle"
        label="Title"
        variant="standard"
        onChange={(e) => dispatch(updateQuestion({
          uuid: props.uuid,
          key: "title",
          data: e.target.value
        }))}
      />
      <TextField
        className="qTitle"
        id="questionDesc"
        label="description"
        variant="standard"
        onChange={(e) => dispatch(updateQuestion({
          uuid: props.uuid,
          key: "desc",
          data: e.target.value
        }))}
      />
      <Select
        className="selectType"
        value={qType}
        onChange={(e) => handleQType(e.target.value)}
      >
        <MenuItem value="radio">radio</MenuItem>
        <MenuItem value="checkbox">check box</MenuItem>
        <MenuItem value="text">text</MenuItem>
      </Select>
      <DeleteIcon
        className="deleteQuestion"
        onClick={() => dispatch(updateQuestion({
          uuid: props.uuid,
          key: "delete"
        }))}
      />
      <Fab
        className='addOptionButton'
        color='secondary'
        onClick={() => dispatch(makeOption({
          qUuid: props.uuid
        }))}
      >
        <AddIcon />
      </Fab>
      {qType !== 'text' && options?.map((option) => {
        return(
          <Option
            key={option.uuid}
            qUuid={props.uuid}
            optionUuid={option.uuid}
            type={qType}
          />
        )
      })}
      {qType === 'text' &&
        <OptionText uuid={props.uuid}/>
      }
    </div>
  )
}