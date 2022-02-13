import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../app/store';
import { updateOption, checkOption } from '../app/formSlice';
import '../App.scss';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

interface props {
  qUuid: string;
  optionUuid: string;
  type: string;
}

function Option(props: props) {
  const dispatch = useDispatch();
  const option = useSelector(((state: RootState) => {
    var question: any = state.form.questions.find(
      question => question.uuid === props.qUuid)
    return question.options.find(
      (option: any) => option.uuid === props.optionUuid
    )
  }), shallowEqual);

  if (props.type === 'radio') {
    return (
      <div className='optionCheck'>
        <Radio
          checked={option?.checked}
          onChange={(e) => dispatch(checkOption({
            qUuid: props.qUuid,
            optionUuid: props.optionUuid,
            type: props.type
          }))}
        />
        <TextField
          className="optionCheckText"
          id="optionCheckText"
          label="description"
          variant="standard"
          value={option?.desc}
          onChange={(e) => dispatch(updateOption({
            qUuid: props.qUuid,
            optionUuid: props.optionUuid,
            key: "desc",
            data: e.target.value
          }))}
        />
        <DeleteIcon
          className="deleteOption"
          onClick={() => dispatch(updateOption({
            qUuid: props.qUuid,
            optionUuid: props.optionUuid,
            key: "delete",
          }))}
        />
      </div>
    );
  } else {
    return (
      <div className='optionCheck'>
        <Checkbox
          checked={option?.checked}
          onChange={(e) => dispatch(checkOption({
            qUuid: props.qUuid,
            optionUuid: props.optionUuid,
            type: props.type
          }))}
        />
        <TextField
          className="optionCheckText"
          id="optionCheckText"
          label="description"
          variant="standard"
          value={option?.desc}
          onChange={(e) => dispatch(updateOption({
            qUuid: props.qUuid,
            optionUuid: props.optionUuid,
            key: "desc",
            data: e.target.value
          }))}
        />
        <DeleteIcon
          className="deleteOption"
          onClick={() => dispatch(updateOption({
            qUuid: props.qUuid,
            optionUuid: props.optionUuid,
            key: "delete",
          }))}
        />
      </div>
    )
  }
}

export default React.memo(Option)