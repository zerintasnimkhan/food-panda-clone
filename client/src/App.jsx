import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import LandingPage from './Pages/LandingPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
