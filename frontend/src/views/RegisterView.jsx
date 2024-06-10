import { toast } from "react-toastify";
import Logo from "../assets/svg/logo.svg";
import BgRegister from "../assets/png/register.png";
import app from "../common/app";
import theme from "../common/theme";
import { useNavigate } from "react-router-dom";
import routes from "../routes/routes";
import { login, register } from "../services/auth_service";
import { useRef, useState } from "react";

function RegisterView() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    repeatPassword: ''
  });
  const username = useRef('');
  const password = useRef('');
  const repeatPassword = useRef('');

  async function onSubmit(e) {
    e.preventDefault();
    setErrors({});

    const user = await register(username.current.value, password.current.value, repeatPassword.current.value);

    setErrors(user.errors);

    if(user.message == 'SUCCESS') {
      toast.success('Register success, please login');
      navigate('/');
    }
  }

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className="absolute h-screen w-screen z-0 bg-gray-800 opacity-50"></div>

      <div className="dark:bg-gray-800 bg-white rounded z-10 w-2/4 flex">
        <div className="w-1/2">
          <img src={BgRegister} className="w-full h-full object-cover rounded" alt="Logo"/> 
        </div>

        <div className="p-5 w-1/2">
          <div className="mb-10 flex items-center">
            <div>
              <img src={Logo} className="h-12 me-3" alt="Logo"/> 
            </div>
            <div className="text-white text-2xl font-bold">
              {app.name}
            </div>
          </div>
          <div className="text-2xl font-bold mb-6 text-white">Create an account</div>
          <form onSubmit={onSubmit}>
            <input required type="text" className={`mb-1 ${theme.textfield}`} placeholder="Username" ref={username} />
            <small className="text-red-500">{errors.username}</small>

            <input required type="password" className={`mt-5 mb-1 ${theme.textfield}`} placeholder="Password" ref={password} />
            <small className="text-red-500">{errors.password}</small>

            <input required type="password" className={`mt-5 mb-1 ${theme.textfield}`} placeholder="Repeat Password" ref={repeatPassword} />
            <small className="text-red-500">{errors.repeatPassword}</small>

            <div className="my-1">
              <a href={'/'} className="text-blue-500 text-sm underline">Already have an account?</a>
            </div>

            <button type="submit" className="w-full mt-8 hover:bg-slate-500 bg-slate-700 py-2 rounded text-white font-semibold">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterView;
