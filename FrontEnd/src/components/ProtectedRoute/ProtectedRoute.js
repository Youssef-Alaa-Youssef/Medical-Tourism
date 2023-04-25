import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ProtectedRoute({ realData, children }) {
    const { id } = useParams();

    const location = useLocation()
    const GetUserData = jwtDecode(localStorage.getItem('token'));
console.log(GetUserData)
    if (realData == null && localStorage.getItem("token") == null) {
        return <Navigate to="/signin" />;}
    else if((GetUserData.role == "Patient" && location.pathname === `/bookplace/${id}`) || (GetUserData.role == "Patient" && location.pathname === `/tourismCompany`)|| (GetUserData.role == "Patient" && location.pathname === `/show/${id}`)|| (GetUserData.role == "Patient" && location.pathname === `/updateDoctor/${id}`)|| (GetUserData.role == "Patient" && location.pathname === `/AddNewDoctor`)|| (GetUserData.role == "Patient" && location.pathname === `/AddTourismPlaces`)|| (GetUserData.role == "Patient" && location.pathname === `/Updateplace/${id}`)|| (GetUserData.role == "Patient" && location.pathname === `/TreatmentCenter`)){
            toast.warning("You must be a tourist to make reserve.");
            return <Navigate to="/treatment" />;
    }else if((GetUserData.role == "Tourist" && location.pathname === `/doctorDetail/${id}`) ||(GetUserData.role == "Tourist" && location.pathname === `/tourismCompany`)|| (GetUserData.role == "Tourist" && location.pathname === `/show/${id}`)|| (GetUserData.role == "Tourist" && location.pathname === `/updateDoctor/${id}`)|| (GetUserData.role == "Tourist" && location.pathname === `/AddNewDoctor`)|| (GetUserData.role == "Tourist" && location.pathname === `/AddTourismPlaces`)|| (GetUserData.role == "Tourist" && location.pathname === `/Updateplace/${id}`)|| (GetUserData.role == "Tourist" && location.pathname === `/TreatmentCenter`)){
        toast.warning("You must be a patient to make reserve.");
        return <Navigate to="/Tourism" />;
}
    
    else if((GetUserData.role == "Tourism Company" && location.pathname === `/TreatmentCenter`)||(GetUserData.role == "Tourism Company" && location.pathname === `/treatment`) ||(GetUserData.role == "Tourism Company" && location.pathname === `/Tourism`)|| (GetUserData.role == "Tourism Company" && location.pathname === `/bookplace/${id}`)|| (GetUserData.role == "Tourism Company" && location.pathname === `/detail/${id}`)|| (GetUserData.role == "Tourism Company" && location.pathname === `/show/${id}`)|| (GetUserData.role == "Tourism Company" && location.pathname === `/updateDoctor/${id}`)|| (GetUserData.role == "Tourism Company" && location.pathname === `/place_detail/${id}`)|| (GetUserData.role == "Tourism Company" && location.pathname === `/AddNewDoctor`)|| (GetUserData.role == "Tourism Company" && location.pathname === `/profile`)|| (GetUserData.role == "Tourism Company" && location.pathname === `/tourismPlaces`)){
            return <Navigate to="/tourismCompany" />;
    } else if((GetUserData.role == "Treatment Center" && location.pathname === `/tourismCompany`)||(GetUserData.role == "Treatment Center" && location.pathname === `/treatment`) ||(GetUserData.role == "Treatment Center" && location.pathname === `/Tourism`)|| (GetUserData.role == "Treatment Center" && location.pathname === `/bookplace/${id}`)|| (GetUserData.role == "Treatment Center" && location.pathname === `/detail/${id}`)|| (GetUserData.role == "Treatment Center" && location.pathname === `/show/${id}`)|| (GetUserData.role == "Treatment Center" && location.pathname === `/Updateplace/${id}`)|| (GetUserData.role == "Treatment Center" && location.pathname === `/place_detail/${id}`)|| (GetUserData.role == "Treatment Center" && location.pathname === `/profile`)|| (GetUserData.role == "Treatment Center" && location.pathname === `/AddTourismPlaces`)|| (GetUserData.role == "Treatment Center" && location.pathname === `/tourismPlaces`)){
        return <Navigate to="/TreatmentCenter" />;
}else {
        return children;
    }
}