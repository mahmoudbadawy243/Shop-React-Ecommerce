/*

== context used in state management that enable me to use variable that is weitten in 'value' attribute allover the program 

== don't forget to write in app.jsx that >>> <UserContextProvider>  // import it
                                                <RouterProvider
                                                  router={router}
                                                  future={{ v7_startTransition: true }} //new version of react router
                                                ></RouterProvider>
                                              </UserContextProvider>


== in page that need to use context >>> import 'useContext' and name of context such as 'userContext' >>> let variable = useContext(UserContext)

*/

import { createContext, useEffect, useState } from "react";

export let UserContext = createContext(0); // name of variable here must be first letter capital

export default function UserContextProvider(props) {
  const [userLogin, setUserLogin] = useState(null); // it is responspol for >> if user is login tell all sections of programm that and vice versa >>-- and it carry TOKEN
  useEffect(() => {
    // solving the proplem of when refresh all data removed and user get logout
    if (localStorage.getItem("userToken") !== null) {
      setUserLogin(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
