import { Button} from "antd"
import { ToastContainer, toast } from 'react-toastify';
import css from "./auth.module.css"
import { useContext, useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
export default function Auth(){
    const [loading,setloading] = useState(false);
    const nav = useNavigate()
    const [user,setuser]:any = useContext(userContext);

    //if user exist, go to dashboard
    useEffect(()=>{
        if(user){
            nav("/dashboard");
        }
    },[])

    function notify(mode:"success"|"error",msg:string):void{
        if(mode=="success"){
            toast.success(msg,{
                autoClose:3000,
                position:"top-center",
                pauseOnHover:true
            })
        }
        else{
            toast.error(msg,{
                autoClose:3000,
                position:"top-center",
                pauseOnHover:true
            })
        }
    }

    async function login(){
        if(loading) return
        setloading(true);

        try{
            const res = await axios.get("https://randomuser.me/api/?results=1&nat=us");
            notify("success","user logging in");
            //timeOut alaki:
            setTimeout(()=>{
                console.log(res.data.results[0]);
                setuser(res.data.results[0]);
                nav("/dashboard");
            },2500)
        }catch(err){
            notify("error","failed to get user");
        }
        setloading(false)
    }

    return(
        <>
            <div className={css.con}>
                <Button loading={loading} type="primary" onClick={login}>LOGIN</Button>
            </div>
            <ToastContainer/>
        </>
    )
}