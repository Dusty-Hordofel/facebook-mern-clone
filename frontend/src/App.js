import { LiveVideo } from './svg';
import axios from 'axios';

function App() {
  const get = async () => {
    const response = await axios.get('http://localhost:8600');
    console.log(response);
  };
  get();
  return (
    <div>
      welcome to frontend
      <div className="birthdays_icon"></div>
      <LiveVideo color="green" />
    </div>
  );
}

export default App;
