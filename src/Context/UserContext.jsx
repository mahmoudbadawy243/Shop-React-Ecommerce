import { createContext, useState } from "react";

export let UserContext = createContext(0);

export default function UserContextProvider(props) {
  const [userLogin, setUserLogin] = useState(null);

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
