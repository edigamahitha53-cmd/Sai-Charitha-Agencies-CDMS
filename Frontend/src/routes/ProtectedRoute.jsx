import React from "react";
import { Navigate } from "react-router-dom";


function ProtectedRoute({ children }) {

  const loggedInShop =
    JSON.parse(
      localStorage.getItem("loggedInShop")
    );


  if (!loggedInShop) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  return children;

}


export default ProtectedRoute;