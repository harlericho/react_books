import logo from './logo.svg';
import './App.css';
import Book from './components/Book';
function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='row justify-content-center p-5'>
          <h2>React Book</h2>
          <img src={logo} className="App-logo" alt="logo" />
          <Book />
        </div>
      </div>
    </div>
  );
}

export default App;
