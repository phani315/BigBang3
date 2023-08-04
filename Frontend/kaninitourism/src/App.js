import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import AdminLanndingPage from './Components/AdminLandingPage/AdminLandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TourPackages from './Components/TourPackagesPage/TourPackages';
import HomePage from './Components/HomePage/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import TourPackagesCard from './Components/TourPackagesPage/TourPackagesCard';
import ImageGallery from './Imageupload';
import TourDetails from './Components/TourDetails/TourDetails';
function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    {/* <Route path='/AdminDashboard' element={<AdminLanndingPage/>}/> */}
    <Route path='/TourPackage' element={<TourPackages/>}></Route>
    <Route path="/tour-details/:tourId" element={<TourDetails/>} />

</Routes>
</BrowserRouter>
    </div>
    
  );
}

export default App;
