import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import AdminLanndingPage from './Components/AdminLandingPage/AdminLandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TourPackages from './Components/TourPackagesPage/TourPackages';

import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div>
      <TourPackages></TourPackages>
    <BrowserRouter>
    <Routes>
    {/* <Route path='/' element={<Login/>}/> */}
    {/* <Route path='/AdminDashboard' element={<AdminLanndingPage/>}/> */}
</Routes>
</BrowserRouter>
    </div>
    
  );
}

export default App;
