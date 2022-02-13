import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../app/store';
import AddQuestionButton from './addQuestionButton';
import Question from './question';
import '../App.scss';

export default function Questions() {
  const questionUuids = useSelector(((state: RootState) => state.form.questions.map(
    (question) => question.uuid
  )), shallowEqual);

  return (
    <div className='questionBox'>
      {questionUuids.map((uuid) => {
        return (
          <Question key={uuid} uuid={uuid} />
        )
      })}
      <AddQuestionButton />
    </div>
  )
}