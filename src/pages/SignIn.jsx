import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFaliure } from "../redux/slices/userSlice";
import OAuth from "../components/OAuth";


const SignIn = () => {

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({});
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  } ;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res = await fetch('/api/v1/sign-in',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(signInFaliure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/')
    } catch(error) {
      dispatch(signInFaliure(error.message));
    }
    

  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
        <input onChange={handleChange} type="email" placeholder="email" className="border p-3 rounded-lg" id="email" />
        <input onChange={handleChange} type="password" placeholder="password" className="border p-3 rounded-lg" id="password" />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{
          loading? 'Loading...': 'Sign In'
        }</button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have ave an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700 hover:underline">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}

export default SignIn