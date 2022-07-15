import React from 'react'
import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../../helpers';

interface IProtectedFavourites {
  children: any
}


const ProtectedFavourites = (props: IProtectedFavourites) => {
  const { children } = props;
  let isLoggedIn = getAccessToken();
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedFavourites