import { createContext, useContext, useState } from "react";


const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [username, setUsername] = useState("");
    
   return (
    <UserContext.Provider value={{ username, setUsername}}>
      {children}
    </UserContext.Provider>
  );
};

 
export const UserData = () => useContext(UserContext);
