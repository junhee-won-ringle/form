import './App.scss';
import Topbar from './app/topbar';
import Title from './app/title';
import Questions from './app/questions';
import AddQuestionButton from './app/addQuestionButton';

function App() {
  return (
    <div className="App">
      <Topbar />
      <Title />
      <hr className="hr"></hr>
      <Questions />
      <AddQuestionButton />
    </div>
  );
}

export default App;
