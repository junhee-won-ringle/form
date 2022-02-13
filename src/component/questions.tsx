import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../app/store';
import AddQuestionButton from './addQuestionButton';
import Question from './question';
import '../App.scss';

export default function Questions() {
  /**
   * 이 컴포넌트는 questions의 uuid 배열만 필요하고
   * question을 추가하거나 삭제하지 않는 한, questions의 uuid 배열은 변하지 않으므로,
   * shallowEqual을 통한 리렌더링 방지
   */
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