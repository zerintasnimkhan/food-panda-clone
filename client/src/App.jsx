import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import LandingPage from './Pages/LandingPage';
import CustomerContainer from './Pages/Customer/CustomerContainer';
import CustomerHome from './Pages/Customer/CustomerHome';
import RestaurantHome from './Pages/Restaurant/RestaurantHome';
import RestaurantContainer from './Pages/Restaurant/RestaurantContainer';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/customer/" element={<CustomerContainer />}>
          <Route path="home" element={<CustomerHome />} />
        </Route>

        <Route path="/restaurant/" element={<RestaurantContainer />}>
          <Route path="home" element={<RestaurantHome />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
