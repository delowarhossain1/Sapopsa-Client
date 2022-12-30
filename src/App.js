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

function App() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/loading' element={<Loading />} />


          {/* Dashboard route */}
          <Route path='/dashboard' element={< Dashboard/>}> 
              <Route index element={<Report />} />
          </Route>
        </Routes>

        <Footer />
    </div>
  );
}

export default App;
