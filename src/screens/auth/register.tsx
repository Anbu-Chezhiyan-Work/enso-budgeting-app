import { useState } from "react";
import CustomButton from "../../components/button/button";
import CustomInput from "../../components/inputBox/inputBox";
import { useSignupMutation } from "../../redux/api/auth/authApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [authInfo, setAuthInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signup, { isLoading: signupLoading }] = useSignupMutation();

  const handleSignup = async () => {
    const { email, password } = authInfo;
    const res = await signup({ email, password });
    console.log("Signup result:", res);
  };

  return (
    <div className="w-80 p-4 flex flex-col gap-3 bg-white rounded-lg shadow">
      <div className="text-center font-bold">REGISTER</div>

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

      <CustomInput
        label="Confirm Password"
        type="password"
        value={authInfo.confirmPassword}
        onChange={(e) =>
          setAuthInfo((prev) => ({ ...prev, confirmPassword: e.target.value }))
        }
      />

      <div className="text-[12px] text-center select-none">
        <span>Already have an account? </span>
        <span
          className="font-[primary] cursor-pointer"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </span>
      </div>

      <CustomButton
        label="Register"
        type="primary"
        disabled={
          !(
            authInfo.email.trim().length > 0 &&
            authInfo.password.trim().length > 0 &&
            authInfo.password.trim() === authInfo.confirmPassword.trim()
          )
        }
        onClick={handleSignup}
        loading={signupLoading}
      />
    </div>
  );
}
