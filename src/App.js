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
import Slider from './components/pages/Home/Slider/Slider';
import SliderManage from './components/pages/Dashboard/Admin/SliderManage/SliderManage';
import ManageOrders from './components/pages/Dashboard/Admin/ManageOrders/ManageOrders';
import ManageProducts from './components/pages/Dashboard/Admin/ManageProducts/ManageProducts';
import ManageCategories from './components/pages/Dashboard/Admin/ManageCategories/ManageCategories';
import ManageHeading from './components/pages/Dashboard/Admin/ManageHeading/ManageHeading';
import Customers from './components/pages/Dashboard/Admin/Customers/Customers';
import Admins from './components/pages/Dashboard/Admin/Admins/Admins';
import AddNewCategori from './components/pages/Dashboard/Admin/ManageCategories/AddNewCategori';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/loading' element={<Loading />} />


        {/* Dashboard route */}
        <Route path='/dashboard' element={
          <RequiredAuth>
            < Dashboard />
          </RequiredAuth>
        }>

          <Route index element={<Report />} />
          <Route path='manage-orders' element={<ManageOrders />} /> 
          <Route path='manage-products' element={<ManageProducts />} /> 
          <Route path='manage-categories' element={<ManageCategories />} /> 
          <Route path='manage-slider' element={<SliderManage />} /> 
          <Route path='manage-heading' element={<ManageHeading/>} /> 
          <Route path='customers' element={<Customers/>} /> 
          <Route path='admins' element={<Admins/>} /> 

          <Route path='manage-categories/add-new-category' element={<AddNewCategori />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
