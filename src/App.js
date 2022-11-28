
import './App.css';
import Listing from './components/Listing';

function App() {
  return (
    <main>
      <div className='wrapper'>
        <div className='welcome-content'>
            <div className='title-sec'>
                <h2>What to <span>Do</span> ??</h2>
                <p>List here..</p>
            </div>
            <div className='content-wrap'>
                <Listing/>
            </div>
        </div>
      </div>
    </main>
  );
}

export default App;