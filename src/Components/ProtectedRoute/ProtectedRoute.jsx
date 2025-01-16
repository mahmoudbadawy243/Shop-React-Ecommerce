/*

== don't forget to write that in 'App.jsx' >>>
                                              path: "cart",
                                              element: (
                                                <ProtectedRoute>
                                                  <Cart />
                                                </ProtectedRoute>
                                              ),
                                            },



                                            
*/
import React from "react";
import { Navigate } from "react-router-dom"; // take care :'Navigate' not 'useNavigate'

export default function ProtectedRoute(props) {
  if (localStorage.getItem("userToken") !== null) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
