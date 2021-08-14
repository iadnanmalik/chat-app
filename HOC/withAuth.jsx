import { useRouter } from "next/router";
import { useUsersContext } from '../context/UsersContext';
import { useMemo,useEffect, useCallback, useState } from 'react';
//import { useState } from "react/cjs/react.development";
import { setAuth } from "../utils/setAuth";
import axios from "axios";
import { SERVER_URL } from "../server";

const withAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    
    const {user,setUser}=useUsersContext()

    const loadUser=useCallback( async (localToken)=>{
        setAuth(localToken)
        try {
            const res = await axios.get(`${SERVER_URL}/api/users/me`);
            const{email,name,avatar}=res.data
            setUser({email,name,avatar})    
        } 
        catch (error) {
            console.log(error)
            }
    },[setUser])

    useEffect(() => {
        const localToken=localStorage.getItem("token")
       loadUser(localToken) 
    }, [loadUser])
  
    if (typeof window !== "undefined") {
   
        const Router = useRouter();
        const accessToken = localStorage.getItem("token");

        if (!accessToken) {
            Router.replace("/login");
            return null;
        }

      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withAuth;
