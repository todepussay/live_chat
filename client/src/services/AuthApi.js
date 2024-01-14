import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getItem, setItem, removeItem } from './LocalStorage';
import { Navigate } from 'react-router-dom';

export function hasAuthenticated() {
  const token = getItem('authToken');
  const result = token ? tokenIsValid(token) : false;

  if (false === result) {
      removeItem('authToken');
  }

  return result;
}


export function login(credentials) {
  console.log("Connexion en cours...")
  return axios
    .post(`http://${process.env.REACT_APP_SERVER_URL}/api/login`, credentials)
    .then(response => {
      if(response.data.success){
        setItem('authToken', response.data.token);
        return response.data;
      } else {
        return response.data;
      }
    });
}

export function logout() {
  removeItem('authToken');
  return <Navigate to="/login" />
}

function tokenIsValid(token){
  const { exp } = jwtDecode(token);

  if(exp * 1000 > new Date().getTime()){
    return true;
  } 

  return false;
}

export function getId(){
  if(!hasAuthenticated()) return false;
  const token = getItem('authToken');
  const { id } = jwtDecode(token);
  return id;
}

export function getUsername(){
  if(!hasAuthenticated()) return false;
  const token = getItem('authToken');
  const { username } = jwtDecode(token);
  return username;
}

export function getEmail(){
  if(!hasAuthenticated()) return false;
  const token = getItem('authToken');
  const { email } = jwtDecode(token);
  return email;
}

export function getAvatar(){
  if(!hasAuthenticated()) return false;
  const token = getItem('authToken');
  const { avatar } = jwtDecode(token);
  return avatar;
}