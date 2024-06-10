import { toast } from "react-toastify";
import Logo from "../assets/svg/logo.svg";
import BgLogin from "../assets/jpg/bg-login.jpg";
import app from "../common/app";
import theme from "../common/theme";
import { useNavigate } from "react-router-dom";
import routes from "../routes/routes";
import { login } from "../services/auth_service";
import { useRef, useState } from "react";

function AuthView() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });
  const username = useRef('');
  const password = useRef('');

  async function onSubmit(e) {
    e.preventDefault();
    setErrors({});

    const user = await login(username.current.value, password.current.value);

    if(user.errors != null) {
      return setErrors(user.errors);
    }

    localStorage.setItem('token', user.data.accessToken);
    localStorage.setItem('refreshToken', user.data.refreshToken);
    localStorage.setItem('info', JSON.stringify({username: user.data.username, role: user.data.role, id: user.data.id}));

    toast.success('Login success!');

    if(user.data.role == 'ADMIN') {
      navigate(routes.recipeManagement);
    } else {
      navigate(routes.home);
    }
  }

  return (
    <div className='h-screen flex items-center justify-center'>
      <img className="brightness-50 absolute h-screen w-screen z-0" src={BgLogin} alt="" srcSet="" />
      <div className="absolute h-screen w-screen z-0 bg-gray-800 opacity-50"></div>

      <div className="dark:bg-gray-800 bg-white rounded p-5 z-10 w-1/4">
        <div className="mb-10 flex items-center">
          <div>
            <img src={Logo} className="h-12 me-2" alt="Logo"/> 
          </div>
          <div className="text-white text-2xl font-bold">
            {app.name}
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold mb-6 text-white">Login to continue</div>
          <form onSubmit={onSubmit}>
            <input required type="text" className={`mb-1 ${theme.textfield}`} placeholder="Username" ref={username} />
            <small className="text-red-500">{errors.username}</small>

            <input required type="password" className={`mt-5 mb-1 ${theme.textfield}`} placeholder="Password" ref={password} />
            <small className="text-red-500">{errors.password}</small>

            <div className="my-1">
              <a href={routes.register} className="text-blue-500 text-sm underline">Create an account</a>
            </div>

            <button type="submit" className="w-full mt-8 hover:bg-slate-500 bg-slate-700 py-2 rounded text-white font-semibold">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthView;
