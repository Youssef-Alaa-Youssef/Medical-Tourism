
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Home from './pages/HomePage';
import Treatment from './pages/Treatment';
import Details from './components/Details/Details';
import MainTourism from './pages/MainPopular';
import Tourism_places from './pages/Tourism_Places';
import AddDoctor from './components/AddDoctor/AddDoctor';
import Profile from './pages/Profile';
import TreatmentCeneter from './pages/TreatmentCenter';
import TourismCompany from './pages/TourismCompany'
import ListOfDoctors from './components/ListOfDoctors/ListOfDoctors';
import UpdateDoctor from './components/UpdateDoctor/UpdateDoctor';
import ShowTourism from './pages/ShowTourism';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Master from './components/Master/Master';
import Updateplace from './components/updateplace/updateplace'
import { useLocation } from "react";
import { useDispatch, useSelector } from "react-redux"
import { changeLoader } from './Store/Actions/LoaderAction'
import AddTourismPlaces from './components/AddPlace/AddPlace';
import ListOfPlaces from './components/ToursimDetails/ListOfPlaces';
import BookPlace from './components/BookPlaces/BookPlace';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // const location = useLocation();
  let [realData, setRealData] = useState(null)
  let userData = () => {
    let getData = localStorage.getItem("token")
    let dataDecode = jwtDecode(getData)
    setRealData(dataDecode)
  }



  useEffect(() => {
    if (localStorage.getItem("token")) {
      userData();
    }
  }, [])

  let logOUt = () => {
    localStorage.removeItem("token")
    setRealData(null)
  }

  let Routers = createBrowserRouter([
    {
      path: "/",
      element: <Master realData={realData} logOut={logOUt} />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/signin", element: <SignIn setData={userData} /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/treatment", element:  <ProtectedRoute realData={realData}> <Treatment /></ProtectedRoute> },
        { path: "/Tourism", element: <ProtectedRoute realData={realData}>  <MainTourism /> </ProtectedRoute>},
        { path: "/tourismPlaces", element: <ProtectedRoute realData={realData}><Tourism_places /></ProtectedRoute> },
        { path: "/AddTourismPlaces", element:<ProtectedRoute realData={realData}> <AddTourismPlaces /></ProtectedRoute> },
        { path: "/tourismCompany", element: <ProtectedRoute realData={realData}> <TourismCompany /></ProtectedRoute>  },
        { path: "/Updateplace/:id", element:<ProtectedRoute realData={realData}> <Updateplace /> </ProtectedRoute>},
        { path: "/detail/:id", element:<ProtectedRoute realData={realData}> <ListOfDoctors /> </ProtectedRoute>},
        { path: "/place_detail/:id", element:<ProtectedRoute realData={realData}>  <ListOfPlaces /> </ProtectedRoute>},
        { path: "/updateDoctor/:id", element:<ProtectedRoute realData={realData}>  <UpdateDoctor /> </ProtectedRoute>},
        { path: "/doctorDetail/:id", element: <ProtectedRoute realData={realData}> <Details /> </ProtectedRoute> },
        { path: "/TreatmentCenter", element: <ProtectedRoute realData={realData}><TreatmentCeneter /></ProtectedRoute> },
        { path: "/AddNewDoctor", element: <ProtectedRoute realData={realData}> <AddDoctor /></ProtectedRoute> },
        { path: "/profile", element: <ProtectedRoute realData={realData}> <Profile setData={userData} /> </ProtectedRoute> },
        { path: "/show/:id", element: <ProtectedRoute realData={realData}><ShowTourism /> </ProtectedRoute>},
        { path: "/bookplace/:id", element: <ProtectedRoute realData={realData}><BookPlace /> </ProtectedRoute>}
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={Routers} />
      <ToastContainer />
    </>


  )
}

export default App;