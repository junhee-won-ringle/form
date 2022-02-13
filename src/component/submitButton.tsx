import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Button from '@mui/material/Button';


export default function SubmitButton() {
  const form = useSelector((state: RootState) => state)
  const handleClick = () => {
    alert("콘솔에 설문지가 출력되었습니다.");
    console.log(form);
  }
  return (
    <Button
      className="submitButton"
      color="secondary"
      variant="contained"
      onClick={() => handleClick()}
    >
      SUBMIT
    </Button>
  )
}