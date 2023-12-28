import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getItem, setItem, removeItem } from './LocalStorage';

export function hasAuthenticated() {
  const token = getItem('authToken');
  
  if(token){
    if(tokenIsValid(token)){
      return true;
    } else {
      removeItem('authToken');
    }
  } 
  return false;
}

export function login(credentials) {
  return axios
    .post('http://localhost:8000/api/login', credentials)
    .then(response => response.data.token)
    .then(token => {
      setItem('authToken', token);
    });
}

export function logout() {
  removeItem('authToken');
}

function tokenIsValid(token){
  const { exp } = jwtDecode(token);

  if(exp * 1000 > new Date().getTime()){
    return true;
  } 

  return false;
}