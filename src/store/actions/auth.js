import axios from 'axios';
import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes'

export const auth = (email, password, isLogin) => async dispatch => {

    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASPf2PErnL4fAEah-SlEOehHupIchB_kE'
    
    if(isLogin){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASPf2PErnL4fAEah-SlEOehHupIchB_kE'
    }
    const response = await axios.post(url, authData)
    const data = response.data
    
    const exparetionDate = new Date(new Date().getTime() + data.expiresIn*1000)

      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userId', data.localId)
      localStorage.setItem('exparetionDate', exparetionDate)
    dispatch(authSuccess(data.idToken))
    dispatch(autoLOgout(data.expiresIn))

    
}

export const autoLOgout = (time) => dispatch => {
    setTimeout(() => {
        dispatch(logout())
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('exparetionDate')
    }, time * 1000)
} 


export const authSuccess = (token) => ({type: AUTH_SUCCESS, token})
export const logout = () => ({type: AUTH_LOGOUT})
    
