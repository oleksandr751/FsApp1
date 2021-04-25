import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
 const auth = useContext(AuthContext);
 const { loading, error, request, clearErrors } = useHttp();
 const message = useMessage();
 const [form, setForm] = useState({
  email: "",
  password: "",
 });

 useEffect(() => {
  message(error);
  clearErrors();
 }, [error, message, clearErrors]);

 useEffect(() => {
  window.M.updateTextFields();
 }, []);

 const handleSignUp = async () => {
  try {
   const data = await request("/api/auth/register", "POST", { ...form });
   console.log("Data", data);
  } catch (e) {}
 };

 const handleSignIn = async () => {
  try {
   const data = await request("/api/auth/login", "POST", { ...form });
   auth.login(data.token, data.userId);
  } catch (e) {}
 };

 const handleChange = (e) => {
  setForm({
   ...form,
   [e.target.name]: e.target.value,
  });
 };

 return (
  <div className="row">
   <div className="col s6 offset-s3">
    <h1>Auth page</h1>
    <div>
     <form>
      <div>
       <label htmlFor="email">Email</label>
       <input
        onChange={handleChange}
        name="email"
        id="email"
        type="text"
        placeholder="Enter email"
       />
       <label htmlFor="password">Password</label>
       <input
        onChange={handleChange}
        name="password"
        id="password"
        type="password"
        placeholder="Enter password"
       ></input>
       <button type="submit" onClick={handleSignIn} disabled={loading}>
        Sign in
       </button>
       <button type="submit" onClick={handleSignUp} disabled={loading}>
        Sign up
       </button>
      </div>
     </form>
    </div>
   </div>
  </div>
 );
};

export default AuthPage;
