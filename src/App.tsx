import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Auth from "./pages/Auth/Auth"
import { createContext, useEffect, useState} from "react"

import Dashboard from "./pages/Dashboard/Dashboard";
export const userContext = createContext<any>(null);
export default function App(){

  //get user from localStorge if exists:
  const [user,setuser] = useState(()=>{
    let tmp = localStorage.getItem("user");
    return tmp?JSON.parse(tmp):null
  });

  //update local storage:
  useEffect(()=>{
    if(user==null) return;
    localStorage.setItem("user",JSON.stringify(user))
  },[user])

  
  return(
    <userContext.Provider value={[user,setuser]}>
      <Router>
        <Routes>
          <Route path="/" index element={<Auth/>}></Route>
          {/* could have a guard here to wrap around the guarded paths but its just /dashboard so i coded it in dashboard itself */}
          <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </Router>
    </userContext.Provider>
  )
}