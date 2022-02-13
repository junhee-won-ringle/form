import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
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

/**
 * 다른 question 수정 시 발생하는 리렌더링을 방지하기 위해, shallowEqual 사용
 * question 삭제 시 <Questions />가 렌더링 된다.
 * 이 때, <Questoins /> 안에 있는 다른 question들의 리렌더링을 방지하기 위해
 * react.memo 사용
 */
function Question(props: props) {
  const dispatch = useDispatch();
  const optionUuids = useSelector(((state: RootState) => {
    var question: any = state.form.questions.find(
      question => question.uuid === props.uuid
    )
    return question.options.map((option: any) => option.uuid)
  }), shallowEqual);
  const [qType, setQType] = useState<string>('radio');
  
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
      {qType !== 'text' && optionUuids.map((optionUuid: any) => {
        return(
          <Option
            key={optionUuid}
            qUuid={props.uuid}
            optionUuid={optionUuid}
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

export default React.memo(Question)