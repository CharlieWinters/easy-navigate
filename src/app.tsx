import * as React from 'react';
import {createRoot} from 'react-dom/client';

import '../src/assets/style.css';


const App: React.FC = () => {
  const [isAutoNavigate, setIsAutoNavigate] = React.useState(true);

  React.useEffect(() => {
    const getAppData = async () => {
      const data = await miro.board.getAppData('autoToggle');
      debugger
      if (data) {
        setIsAutoNavigate(data.enabled);
      }
    };

    getAppData();

  }, []);

  const handleToggle = async () => {
    await miro.board.setAppData('autoToggle', {enabled: !isAutoNavigate});
    debugger
    setIsAutoNavigate(!isAutoNavigate);
  }

  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <h1>Toggle autonavigate</h1>
        <p>Toggle the autonavigate feature on and off.</p>
      </div>
      <div className="cs1 ce12">
        <label class="toggle">
          <input type="checkbox" tabindex="0" onChange={handleToggle} checked={isAutoNavigate}/>
          <span>Toggle</span>
        </label>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
