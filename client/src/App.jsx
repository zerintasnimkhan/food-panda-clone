import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import LandingPage from './Pages/LandingPage';
import CustomerContainer from './Pages/Customer/CustomerContainer';
import CustomerHome from './Pages/Customer/CustomerHome';
import RestaurantContainer from './Pages/Restaurant/RestaurantContainer';
import OrdersPage from './Pages/Restaurant/OrdersPage';
// import FoodPage from './Pages/Restaurant/FoodPage';
import RestaurantInfo from './Pages/Restaurant/RestaurantInfo';
import ShowFood from './Pages/Customer/ShowFood';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/customer/" element={<CustomerContainer />}>
          <Route path="home" element={<CustomerHome />} />
          <Route path="restaurant/food/:id" element={<ShowFood />}></Route>
        </Route>
       
        <Route path="/restaurant/" element={<RestaurantContainer />}>
          <Route path="orders" element={<OrdersPage />} />
          {/* <Route path="food" element={<FoodPage />} /> */}
          <Route path="info" element={<RestaurantInfo />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
