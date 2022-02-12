import './App.scss';
import Topbar from './app/topbar';
import Title from './app/title';
import Questions from './app/questions';
import SubmitButton from './app/submitButton';

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
