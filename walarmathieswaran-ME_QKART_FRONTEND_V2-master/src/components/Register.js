/**import { Warning } from "@mui/icons-material";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [data,setdata]=useState({
    username:"",
    password:"",
    confirmPassword:""
  });


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  
  /*const register = async (formData) => {
    const ans=validateInput(data);
    console.log(ans);
    console.log(formData.password);
    try{
      if(ans)
      {
        await axios.post(`${config.endpoint}/auth/register`,{username:formData.username,password:formData.password});
        enqueueSnackbar("Success",{variant:"success"});
      }
    }
    catch(e)
    {
      console.log(e.response);
      if(e.response.status>=400){
        enqueueSnackbar(e.response.data.message,{variant:"error"});
      }
      else{
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{variant:"warning"});
      }
    }
    // if(ans)
    // {
    //   await axios.post(`${config.endpoint}/auth/register`,formData)
    //   .then((response)=>{
    //     if(response.status===201)
    //     {
    //       enqueueSnackbar("Success",{variant:"Success"});
    //     }
       
    //   })
    //   .catch((err)=>{
    //     if(err.response.status>=400)
    //     {
    //       enqueueSnackbar(err.response.data.message,{variant:"error"});
    //     }
    //     else{
    //       enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON",{variant:"warning"});
    //     }
        
    //   })
      
    // }
    
    
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  /*const handleUser=(e)=>{
    const a=e.target.value;
   
    setdata({...data,
      username:a
    })
    console.log(a);

  }
  const handlePassword=(e=>{
    const b=e.target.value;
    
    setdata({...data,
      password:b
    })
    console.log(b);
  })
  const handleConfirm=(e)=>{
    const c=e.target.value;
    
    setdata({...data,
      confirmPassword:c
      
    })
    console.log(c);
   
  }
  console.log(data);

  const validateInput = (data) => {
    if(data.username.length!==0 && data.username.length>6){
      if(data.password.length!==0 && data.password.length>6)
      {
        if(data.password===data.confirmPassword)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      else
      {
        return false;
      }
    }
    else
    {
      return false;
    }

  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
        
            id="username"
            onChange={(e)=>{handleUser(e)}}
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
          />
          <TextField
            id="password"
            onChange={handlePassword}
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            onChange={handleConfirm}
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
          />
           <Button className="button" variant="contained" onClick={()=>register(data)}>
            Register Now
           </Button>
          <p className="secondary-action">
            Already have an account?{" "}
             <a className="link" href="#">
              Login here
             </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
*/
import { Button, Stack, TextField, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { useHistory,Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";


const Register = () => {
 const { enqueueSnackbar } = useSnackbar();
 const [formData, setFormData] = useState({
 username: "",
 password: "",
 confirmPassword: "",
 });
 const [loading, setLoading] = useState(false);
 const history=useHistory();
  const handleChange = (event) => {
 setFormData({
 ...formData,
 [event.target.name]: event.target.value,
 });
 }; // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
 /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */ 
const loader=document.getElementById("root");

const register = async (formData) => {
 try {
 if (validateInput(formData)) {
  setLoading(true);
  await axios.post(`${config.endpoint}/auth/register`, {
    username: formData.username,
    password: formData.password,
 });
 setLoading(false);
 history.push("/login");

 enqueueSnackbar("Successfully registered", { variant: "success" });
 }
 } 
 catch (e) {
 console.log(e.response);
 setLoading(false);
 if (e.response.status >= 400) {
 enqueueSnackbar(e.response.data.message, { variant: "error" });
 } else {
 enqueueSnackbar(
 "Something went wrong. Check that the backend is running, reachable and returns valid JSON",
 { variant: "warning" }
 );
 }
 }
 }; // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
 /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
const validateInput = (data) => {
 // console.log(data);
 if (data.username === "") {
 enqueueSnackbar("Username required", { variant: "warning" });
 return false;
 } else if (data.username.length < 6) {
 enqueueSnackbar("Username must be atleast 6 characters", { variant: "warning" });
 return false;
 } else if (data.password === "") {
 enqueueSnackbar("Password required", { variant: "warning" });
 return false;
 } else if (data.password.length < 6) {
 enqueueSnackbar("Password must be atleast 6 characters", { variant: "warning" });
 return false;
 } else if (data.confirmPassword !== data.password) {
 enqueueSnackbar("Password do not match", { variant: "warning" });
 return false;
 }
 return true;
 };
 
 return (<Box
 display="flex"
 flexDirection="column"
 justifyContent="space-between"
 minHeight="100vh">
  <Header hasHiddenAuthButtons/>
  <Box className="content">
  <Stack spacing={1} className="form">
  <h2 className="title">Register</h2>
  <TextField
  id="username"
  label="Username"
  variant="outlined"
  title="Username"
  name="username"
  placeholder="Enter Username"
  onChange={handleChange}
  size="small"
  margin="normal"
  sx= {{ width: '41ch' }}
  fullWidth/>
  <TextField
 id="password"
 variant="outlined"
 label="Password"
 name="password"
 type="password"
 helperText="Password must be atleast 6 characters length"
 fullWidth
 placeholder="Enter a password with minimum 6 characters"
 onChange={handleChange}
 size="small"
  margin="normal"
  sx= {{ width: '41ch' }}
 />
 <TextField
 id="confirmPassword"
 variant="outlined"
 label="Confirm Password"
 name="confirmPassword"
 type="password"
 fullWidth
 size="small"
  margin="normal"
  sx= {{ width: '41ch' }}
 onChange={handleChange}
 />
 {!loading && (
 <Button
 className="button"
 variant="contained"
 onClick={() => register(formData)}
 sx= {{ width: '49ch' }}
 >
  
 Register Now</Button>
 )}
 <Box display="flex" justifyContent="center" alignItems="center">
 {
 loading && <CircularProgress />
 }
 </Box>
 <p className="secondary-action">
  Already have an account?{" "}
  <Link to="/login" className="link">
  Login here
  </Link>
 </p>

</Stack>
</Box>
<Footer />
 </Box>
 );
};
export default Register;
