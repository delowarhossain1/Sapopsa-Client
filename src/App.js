import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home/Home';
import Footer from './components/shared/Footer/Footer';
import "./css/about.css";
import "./css/buy-now.css";
import "./css/contact.css";
import "./css/login.css";
import "./css/mobile.css";
import "./css/order-traker.css";
import "./css/places-order.css";
import "./css/privacy.css";
import "./css/single-product.css";
import "./css/style.css";
import "./fonts/specimen_bold/stylesheet.css";
import "./fonts/specimen_italic/stylesheet.css";
import Login from './components/pages/Login/Login';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Report from './components/pages/Dashboard/Admin/Report/Report';
import Loading from './components/shared/Loading/Loading';
import RequiredAuth from './components/shared/Required/RequiredAuth/RequiredAuth';
import ManageSlider from './components/pages/Dashboard/Admin/ManageSlider/ManageSlider';
import ManageOrders from './components/pages/Dashboard/Admin/ManageOrders/ManageOrders';
import ManageProducts from './components/pages/Dashboard/Admin/ManageProducts/ManageProducts';
import ManageCategories from './components/pages/Dashboard/Admin/ManageCategories/ManageCategories';
import ManageHeading from './components/pages/Dashboard/Admin/ManageHeading/ManageHeading';
import Customers from './components/pages/Dashboard/Admin/Customers/Customers';
import Admins from './components/pages/Dashboard/Admin/Admins/Admins';
import AddNewCategori from './components/pages/Dashboard/Admin/ManageCategories/AddNewCategori';
import AddNewSlider from './components/pages/Dashboard/Admin/ManageSlider/AddNewSlider';
import SingleProductDetails from './components/shared/SingleProductDetails/SingleProductDetails';
import useAdmin from './hooks/useAdmin';
import MyOrders from './components/pages/Dashboard/User/MyOrders/MyOrders';

function App() {
  const [isAdmin] = useAdmin();

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product-details/:id' element={<SingleProductDetails />} />


        {/********* Dashboard route ************/}

        <Route path='/dashboard' element={
          <RequiredAuth>
            < Dashboard />
          </RequiredAuth>
        }>
          {/* Index route */}
          {
            ! isAdmin ? 
            <Route index element={<MyOrders />} />
            :
            <Route index element={<Report />} />
          }

          <Route path='manage-orders' element={<ManageOrders />} /> 
          <Route path='manage-products' element={<ManageProducts />} /> 
          <Route path='manage-categories' element={<ManageCategories />} /> 
          <Route path='manage-slider' element={<ManageSlider />} /> 
          <Route path='manage-heading' element={<ManageHeading/>} /> 
          <Route path='customers' element={<Customers/>} /> 
          <Route path='admins' element={<Admins/>} /> 

          <Route path='manage-categories/add-new-category' element={<AddNewCategori />} />
          <Route path='manage-slider/add-new-slider' element={<AddNewSlider />} />

        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
