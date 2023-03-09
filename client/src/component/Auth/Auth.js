import React ,{useState,useEffect} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import Input from './input';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { signin , signup } from '../../actions/auth';
import useStyles from './Style';
import Icon from './icon';
import { GoogleLogin } from 'react-google-login';
import {useDispatch} from 'react-redux'
import {gapi} from 'gapi-script'
import {useNavigate} from 'react-router-dom'

const initialState = {firstName :'' , lastName : '' , email : '' , password :'', confirmPassword : ''};

const Auth = () => {
  
    // const state = null
    const classes = useStyles()
    const [isSignup , setIssignup] = useState(false) 
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formData , setFormData] = useState(initialState)
    const handleChange = (e)=>{
          setFormData({...formData , [e.target.name] : e.target.value})
    }
    const handleSubmit= (e)=>{
        e.preventDefault()

        if (isSignup) {
          dispatch(signup(formData, navigate));
        } else {
          dispatch(signin(formData, navigate));
        }
        
    }
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword=()=>setShowPassword((prevShowPassword)=>!prevShowPassword)

    
    const switchMode=()=>{
        setIssignup((prevIssignup)=>!prevIssignup )
    }
    const googleSuccess= async (res)=>{
        const result = res?.profileObj
        const token = res?.tokenId

        try {
          dispatch({type : 'AUTH' , data : {result , token}})
          navigate('/')
        } catch (error) {
          console.log(error)
        }
        // console.log(res)
    }

    const googleError=(error)=>{
        console.log(error)
    }
    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId:'1057866751631-hsckme6jn11b1e3vsggkoe6h015kru20.apps.googleusercontent.com',
          scope: 'email',
        });
      }
  
      gapi.load('client:auth2', start);
    }, []);

    // const login = useGoogleLogin({
    //   onSuccess: tokenResponse => console.log(tokenResponse),
    // });
    
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }

          </Button>
          <GoogleLogin
            clientId="1057866751631-hsckme6jn11b1e3vsggkoe6h015kru20.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth