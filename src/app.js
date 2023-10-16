import { Routes, Route } from 'react-router-dom';
import { routes } from './store/Routes';

function App() {
  return (
    <div className="App">
      <Routes>
        {
          routes.map(({ path, element }) => <Route key={path} path={path} element={element}/>)
        }
      </Routes>
    </div>
  );
}

export default App;
