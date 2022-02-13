import './App.scss';
import Topbar from './component/topbar';
import Title from './component/title';
import Questions from './component/questions';
import SubmitButton from './component/submitButton';

function App() {
  return (
    <div className="App">
      <Topbar />
      <Title />
      <hr className="hr"></hr>
      <Questions />
      <SubmitButton />
    </div>
  );
}

export default App;
