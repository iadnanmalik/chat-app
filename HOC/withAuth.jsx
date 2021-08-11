import { useRouter } from "next/router";
import { useUsersContext } from '../context/UsersContext';
import { useMemo,useEffect, useCallback } from 'react';
import { useState } from "react/cjs/react.development";
import { setAuth } from "../utils/setAuth";
import axios from "axios";
import { SERVER_URL } from "../server";
const withAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    
    const {user,setUser}=useUsersContext()
    const [localUser,setLocalUser]=useState()
    
    const loadUser=useCallback( async (localToken)=>{
        console.log(localToken)
        setAuth(localToken)
        try {
            const res = await axios.get(`${SERVER_URL}/api/users/me`);
            const{email,name,avatar}=res.data
            setLocalUser({email,name,avatar})  
        } 
        catch (error) {
            console.log(error)
            }
    },[setLocalUser])


    useEffect(() => {
        const localToken=localStorage.getItem("token")
       loadUser(localToken) 
    }, [loadUser])
    useMemo(() => {
        setUser([...user,localUser])
        console.log(user)
    }, [localUser])
    
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const accessToken = localStorage.getItem("token");
      console.log("In here with token ",accessToken)
      //setUser([...user,localUser])
     console.log(user)
     console.log(localUser)
      // If there is no access token we redirect to "/" page.
      
      if (!accessToken) {
        Router.replace("/");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
