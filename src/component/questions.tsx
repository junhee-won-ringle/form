import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import AddQuestionButton from './addQuestionButton';
import Question from './question';
import '../App.scss';

export default function Questions() {
  const questions = useSelector((state: RootState) => state.form.questions)

  return (
    <div className='questionBox'>
      {questions.map((question) => {
        return (
          <Question key={question.uuid} uuid={question.uuid} />
        )
      })}
      <AddQuestionButton />
    </div>
  )
}