import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import LandingPage from './Pages/LandingPage';
import CustomerContainer from './Pages/Customer/CustomerContainer';
import CustomerHome from './Pages/Customer/CustomerHome';
import RestaurantHome from './Pages/Restaurant/RestaurantHome';
import RestaurantContainer from './Pages/Restaurant/RestaurantContainer';
import OrdersPage from './Pages/Restaurant/OrdersPage';
import FoodPage from './Pages/Restaurant/FoodPage';
import RestaurantInfo from './Pages/Restaurant/RestaurantInfo';
import EditRestaurantPage from './Pages/Restaurant/EditRestaurantPage';
import EditFoodPage from './Pages/Restaurant/EditFoodPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/customer/" element={<CustomerContainer />}>
          <Route path="home" element={<CustomerHome />} />
        </Route>

        <Route path="/restaurant/" element={<RestaurantContainer />}>
          <Route path="orders" element={<OrdersPage />} />
          <Route path="food" element={<FoodPage />} />
          <Route path="info" element={<RestaurantInfo />} />
          <Route path="edit/info" element={<EditRestaurantPage />} />
          <Route path="food/edit" element={<EditFoodPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
