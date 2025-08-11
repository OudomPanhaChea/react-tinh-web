// import React from 'react'

import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/useAppContext"
import { useEffect } from "react";

const Loading = () => {
  const { navigate } = useAppContext();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get('next');

  useEffect(() => {
    if(nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 5000);
    }
  }, [nextUrl, navigate]);

  return (
    <div className="flex justify-center items-center h-[95vh]">
      <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-300 border-t-primary"></div>
    </div>
  )
}

export default Loading
