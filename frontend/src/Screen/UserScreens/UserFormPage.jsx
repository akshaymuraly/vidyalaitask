import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import "./UserFormPage.css"
import axios from 'axios';
import { userActions } from '../../Store/Store';
import {useDispatch} from "react-redux"

const UserFormPage = ({url="api/user/userlogin",type="login"}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [error,setError] = useState("")
    const [message,setMessage]= useState("")
    const [loading,setLoading]= useState(false)
    const [inputs,setInputs]=useState({
        email:"",
        password:""
    });
    const handleChange = (e)=>{
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            // console.log(url)
        const response = await axios.post(url,inputs);
        setLoading(false);
        if(response.status===200 && type==="login"){
            dispatch(userActions.userLogin());
            navigate("/homepage")
        }else{
            setMessage(response.data.message)
            setTimeout(()=>setMessage(""),3000)
        }
        }catch(err){
            setLoading(false);
            setError(err?.response?.data?.message||"Unexpected error")
            setTimeout(()=>setError(""),3000);
        }

    }

  return (
    <section className='user-form-container'>
        <div className='user-form-form-container'>
            <div className="form-heading">{type}</div>
            <form action="" className='form' onSubmit={handleSubmit}>
                <div className='user-form-input-outline'>
                    <div className={`input-heading ${error?"error":(message?"message":"")}`}>
                        {error?error:(message?message:"Email")}
                        </div>
                    <input name='email' type="email" className='inputfield' onChange={handleChange} required/>
                </div>
                <div className='user-form-input-outline'>
                    <div className="input-heading">Password</div>
                    <input name='password' type="password" className='inputfield'onChange={handleChange} required/>
                </div>
                <div className='btn-container'>
                    <button className='form-btn' type='submit' disabled={loading}>{loading?"loading...":type}</button>
                    <span className='link'>{type==="login"?"Don't have account?":"Have account?"}<Link to={`${type==="login"?"/signup":"/"}`}>{type==="login"?"signup":"login"}</Link></span>
                </div>
                
            </form>
        </div>
    </section>
  )
}

export default UserFormPage