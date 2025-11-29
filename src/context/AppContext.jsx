// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {dummyChats, dummyUserData} from "../assets/assets"
// const AppContext = createContext();

// //Make a Provider function
// export const AppContextProvider = ({ children }) => {
    
//     const navigate = useNavigate();
//     const [user , setUser] = useState(null);
//     const [chats , setChats] = useState([]);
//     const [selectedChat , setSelectedChat] = useState(null);
//     const [theme , setTheme] = useState(localStorage.getItem('theme') || "light");


//     //Fetch the user when the Component is Reload
//     const fetchUser = async()=>{
//         setUser(dummyUserData)
//     }

//     //This is used to fecth all the Chats of the Users
//     const fetchUserChats =async()=>{
//         setChats(dummyChats)
//         setSelectedChat(dummyChats[0])
//     }

//     useEffect(()=>{
//         //If User is Logging 
//         if(user){
//             fetchUserChats()
//         }else{
//             setChats([])
//             setSelectedChat(null)
//         }
//     },[user])

//     useEffect(()=>{
//         fetchUser()
//     },[])

//     //This is the UseEffect of the Changing the Theme
//     useEffect(()=>{
//         if(theme =="dark"){
//             document.documentElement.classList.add('dark')
//         }else{
//             document.documentElement.classList.remove('dark')
//         }
//         //Save in the local storage
//         localStorage.setItem("theme" , theme)
//     },[theme])




//   const value = {
//     navigate , user , setUser , fetchUser , chats ,setChats , selectedChat ,setSelectedChat,theme , setTheme 
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };
// export const useAppContext = () => {
//   return useContext(AppContext);
// };

// src/context/AppContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Fetch User on page load
  const fetchUser = async () => {
    // setUser(dummyUserData);
  };

  // Fetch Chats
  const fetchUserChats = async () => {
    setChats(dummyChats);
    setSelectedChat(dummyChats[0]);
  };

  // When user changes → load chats OR reset
  useEffect(() => {
    if (user) {
      fetchUserChats();
    } else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user]);

  // Load user when app starts
  useEffect(() => {
    fetchUser();
  }, []);

  // Apply Dark/Light Theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = {
    navigate,
    user,
    setUser,
    fetchUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    theme,
    setTheme,
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
