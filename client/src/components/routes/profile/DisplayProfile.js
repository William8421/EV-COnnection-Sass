import React, {useState} from 'react'
import OwnerProfile from "./UserProfile";
import useAuth from '../../../context/authContext/useAuth';
import NotAuthorized from '../../error/NotAuthorized.js';
function DisplayProfile() {
const {isAuthenticated} = useAuth();
  return (
    <>
    {isAuthenticated ? <OwnerProfile /> : <NotAuthorized /> }</>
  )
}

export default DisplayProfile