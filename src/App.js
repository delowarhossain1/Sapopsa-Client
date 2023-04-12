import { Route, Routes } from 'react-router-dom';
import './App.css';
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
import "./css/userDashboard.css";
import "./fonts/specimen_bold/stylesheet.css";
import "./fonts/specimen_italic/stylesheet.css";
import Login from './components/pages/Login/Login';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Report from './components/pages/Dashboard/Admin/Report/Report';
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
import AddNewProduct from './components/pages/Dashboard/Admin/ManageProducts/AddNewProduct';
import MyDashboard from './components/pages/Dashboard/User/MyDashboar/MyDashboard';
import MyOrderDetails from './components/pages/Dashboard/User/OrderDetails/OrderDetails';
import MyOrders from './components/pages/Dashboard/User/MyOrders/MyOrders';
import RequireAdmin from './components/shared/Required/RequireAdmin/RequireAdmin';
import SingleProductDetails from './components/pages/SingleProductDetails/SingleProductDetails';
import AddToCard from './components/pages/AddToCard/AddToCard';
import Checkout from './components/pages/Checkout/Checkout';
import Home from './components/pages/Home/Home';
import Footer from './components/shared/Footer/Footer';
import { useState } from 'react';
import Navbar from './components/shared/Navbar/Navbar';
import AddNewAdmin from './components/pages/Dashboard/Admin/Admins/AddNewAdmin';
import NotFound from './components/pages/NotFound/NotFound';
import ProductFor from './components/pages/ProductFor/ProductFor';
import CategoriesProducts from './components/pages/CategoriesProducts/CategoriesProducts';
import Settings from './components/pages/Dashboard/Admin/Settings/Settings';
import Payment from './components/pages/Checkout/Payment';
import OrderDetails from './components/pages/Dashboard/Admin/ManageOrders/OrderDetails';
import ProductsDetails from './components/pages/Dashboard/Admin/ManageProducts/ProductsDetails';
import Search from './components/pages/Search/Search';
import ScrollToTop from './components/shared/ScrollToTop/ScrollToTop';
import AboutUs from './components/pages/AboutUs/AboutUs';
import TermsAndCondition from './components/pages/TermsAndCondition/TermsAndCondition';
import ManageAboutUs from './components/pages/Dashboard/Admin/Settings/ManageAboutUs';
import ManageTerms from './components/pages/Dashboard/Admin/Settings/ManageTerms';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from './components/shared/Loading/Loading';
import ManageContactus from './components/pages/Dashboard/Admin/Settings/ManageContactus';



function App() {
  const [settings, setSettings] = useState({});
  const [refetchAddToCardProducts, setRefetchAddToCardProducts] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState({});

  // website setting 
  const {isLoading, refetch} = useQuery('settings', ()=>(
    axios.get('/api/settings')
    .then(res => setSettings(res?.data))
  ));

  if(isLoading) <Loading />

  const {phone, email, navbarTitle, shippingCharge, isNavbarTitleDisplay, aboutUs, termsAndCondition} = settings;

  return (
    <>
        <Navbar 
          refetch={refetchAddToCardProducts} 
          navbarHeading={{navbarTitle, isNavbarTitleDisplay}}
        />

      <div style={{marginTop : isNavbarTitleDisplay ? '115px' : '70px'}}>

        {/* Page scroll from the begging when route will be change */}
        <ScrollToTop />

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product-for/:id' element={<ProductFor />} />
          <Route path='/category/:cty' element={<CategoriesProducts />} />
          <Route path='/search/:text' element={<Search />} />
          <Route path='/about-us' element={<AboutUs aboutUs={aboutUs}/>} />
          <Route path='/terms' element={<TermsAndCondition info={termsAndCondition}/>} />

          <Route path='/checkout' element={
            <RequiredAuth>
              <Checkout 
                setCheckoutInfo={setCheckoutInfo}
                shippingCharge = {shippingCharge}
                />
            </RequiredAuth>
          } />

          <Route path='/payment' element={
            <RequiredAuth>
              <Payment checkoutInfo={checkoutInfo} />
            </RequiredAuth>
          } />

          <Route path='/add-to-card' element={
            <AddToCard
              refetch={setRefetchAddToCardProducts}
              reFetchValue={refetchAddToCardProducts}
            />} />

          <Route path='/product-details/:id' element={
            <SingleProductDetails
              refetch={setRefetchAddToCardProducts}
              reFetchValue={refetchAddToCardProducts}
            />} />


          {/*********** Login required (required auth) ****************/}
          <Route path='/place-order' element={
            <RequiredAuth>
              <Checkout />
            </RequiredAuth>
          } />

          {/*********** User dashboard ****************/}

          <Route path='/my-dashboard' element={
            <RequiredAuth>
              <MyDashboard />
            </RequiredAuth>
          }>
            <Route index element={<MyOrders />} />
            <Route path='order-details/:id' element={<MyOrderDetails />} />
          </Route>


          {/********* Admin dashboard route ************/}

          <Route path='/dashboard' element={
            <RequiredAuth>
              <RequireAdmin>
                < Dashboard />
              </RequireAdmin>
            </RequiredAuth>
          }>
            {/* Index route*/}

            <Route index element={<Report />} />
            <Route path='manage-orders' element={<ManageOrders />} />
            <Route path='manage-orders/order-details/:id' element={<OrderDetails />} />
            <Route path='manage-products' element={<ManageProducts />} />
            <Route path='manage-products/details/:id' element={<ProductsDetails />} />
            <Route path='manage-products/add-new-product' element={<AddNewProduct />} />
            <Route path='manage-categories' element={<ManageCategories />} />
            <Route path='manage-slider' element={<ManageSlider />} />
            <Route path='customers' element={<Customers />} />
            <Route path='admins' element={<Admins />} />
            <Route path='admins/add-new-admin' element={<AddNewAdmin />} />
            <Route path='manage-categories/add-new-category' element={<AddNewCategori />} />
            <Route path='manage-slider/add-new-slider' element={<AddNewSlider />} />

            <Route path='settings' element={<Settings settingsInfo={{isNavbarTitleDisplay, shippingCharge, refetch}}/>} />

            <Route path='settings/about-us' element={<ManageAboutUs aboutus = {{aboutUs, refetch}}/>} />

            <Route path='settings/terms' element={<ManageTerms info={{termsAndCondition, refetch}}/>} />

            <Route path='settings/contact-us' element={<ManageContactus />} />

            <Route path='settings/navbar-title' element={<ManageHeading 
            headingInfo={{navbarTitle, refetch}}/>} />

          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer info={{phone, email}}/>
      </div>
    </>
  );
}

export default App;
