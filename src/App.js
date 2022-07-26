import { 
  BrowserRouter, 
  Route, 
  Routes 
} from 'react-router-dom';
import AppContainer from './components/mainContainer';
import CoinDetails  from './components/coinDetails';
import AppHeader from './components/header';
import './App.css';

function App() {
  return (
    <>
    <AppHeader/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContainer/>} />
        <Route
          path="/view-coin-details/:id"
          element={<CoinDetails/>}
        />
        </Routes>
    </BrowserRouter>
    </>   
  );
}

export default App;
