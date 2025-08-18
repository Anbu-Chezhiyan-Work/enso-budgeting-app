import { useState } from "react";
import CustomButton from "../../components/button/button";
import CustomInput from "../../components/inputBox/inputBox";
import { useLoginMutation } from "../../redux/api/auth/authApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [authInfo, setAuthInfo] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading: loginLoading }] = useLoginMutation();

  const handleLogin = async () => {
    const { email, password } = authInfo;
    await login({ email, password });
  };

  console.log(loginLoading, "isLoading");

  return (
    <div className="w-80 h-fit p-4 flex flex-col gap-3 bg-white rounded-lg shadow">
      <div className="text-center font-bold">LOGIN</div>

      <CustomInput
        label="Email"
        value={authInfo.email}
        onChange={(e) =>
          setAuthInfo((prev) => ({ ...prev, email: e.target.value }))
        }
      />

      <CustomInput
        label="Password"
        type="password"
        value={authInfo.password}
        onChange={(e) =>
          setAuthInfo((prev) => ({ ...prev, password: e.target.value }))
        }
      />

      <div className="text-[12px] text-center select-none">
        <span>Doesn't have an account? </span>
        <span
          className="font-[primary] cursor-pointer"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </span>
      </div>

      <CustomButton
        label="Login"
        type="primary"
        disabled={
          !(
            authInfo.email.trim().length > 0 &&
            authInfo.password.trim().length > 0
          )
        }
        onClick={handleLogin}
        loading={loginLoading}
      />
    </div>
  );
}
