import { useState } from 'react';
import { MdLockOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FaRegUser, FaFacebook } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState({ login: false, facebook: false });

  const facebook = () => {
    setLoading({ ...loading, facebook: true });
    toast.info('Redirecting to Facebook Sign-in', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/facebook`;
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-[#f4f4f4]">
        <div className="flex flex-col border-[1px] border-black border-solid p-5 justify-center shadow-custom rounded-3xl w-[450px] bg-white">
          <form>
            <div className="flex flex-col gap-4">
              <div className="relative flex flex-col gap-2">
                <label className="text-sm font-semibold">Enter email</label>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="Frank119@gmail.com"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-8 p-2 w-full text-sm border border-gray-500 rounded-md relative"
                  />
                  <FaRegUser className="text-blue-600 absolute left-2 top-12 transform -translate-y-1/2" />
                </div>
              </div>

              <div className="relative flex flex-col gap-2">
                <label className="text-sm font-semibold">Password</label>
                <div className="flex items-center gap-2">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                    className="pl-8 p-2 w-full text-sm border border-gray-500 rounded-md relative"
                  />
                  <MdLockOutline className="text-blue-600 absolute left-2 top-12 transform -translate-y-1/2" />
                  {showPassword ? (
                    <MdVisibility
                      className="text-[#4F4F4F] cursor-pointer absolute right-2 top-12 transform -translate-y-1/2"
                      onClick={handleTogglePassword}
                    />
                  ) : (
                    <MdVisibilityOff
                      className="text-[#4F4F4F] cursor-pointer absolute right-2 top-12 transform -translate-y-1/2"
                      onClick={handleTogglePassword}
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-between text-gray-400 text-[13px]">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    value="remember"
                    className="cursor-pointer"
                  />
                  <span>Remember Me</span>
                </div>
              </div>

              <div>
                <button
                  className="text-sm font-semibold w-full bg-[#1C2951] py-2 rounded-md text-white border-2 border-blue-900 relative flex justify-center items-center"
                  disabled={loading.login}
                  style={{ minHeight: '44px' }}
                >
                  {loading.login && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="spinner border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    </div>
                  )}
                  {!loading.login && 'Sign in'}
                </button>
              </div>

              <div
                className="text-[16px] font-semibold w-full py-2 rounded-md text-black border-2 border-blue-700 cursor-pointer"
                onClick={facebook}
              >
                <div className="flex text-sm justify-center items-center gap-2 relative">
                  <FaFacebook className="text-2xl" />
                  {!loading.facebook && 'Sign in with Facebook'}
                  {loading.facebook && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="spinner border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
