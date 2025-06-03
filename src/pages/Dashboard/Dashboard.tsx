import { FloatButton } from "antd"
import css from "./dashboard.module.css"
import { ToastContainer,toast } from "react-toastify/unstyled";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import { useContext, useEffect } from "react";
export default function Dashboard(){
    const nav = useNavigate()
    const [user,setuser] = useContext(userContext)

    //guard:
    useEffect(()=>{
        if(!user){
            nav("/")
        }
    },[])

    function logout(){
        localStorage.removeItem("user");
        toast.info("deleted user",{
            autoClose:3000,
            position:"top-center",
            pauseOnHover:true,
        });
        //timeout alaki:
        setTimeout(() => {
            setuser(null);
            nav("/")
        }, 3000);
    }
    return(
        <>
            <div className={css.con}>
                <h1>Welcome to DashBoard</h1>
                <p>there are alaki timeoutes coded in for toasts, my code isnt slow :)</p>
                <FloatButton tooltip="delete user in LocalStorage" onClick={logout}>:)</FloatButton>
                <ToastContainer/>
            </div>
        </>
    )
}