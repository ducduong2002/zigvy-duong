import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Radio } from "antd";
import { useDispatch } from "react-redux";
import { loginRequest, registerRequest } from "../store/login/userSlice"; 
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { Login, Register } from "@/container/type";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
const LoginPage: React.FC = () => {
  const [position, setPosition] = useState<"Sign In" | "Sign Up">("Sign In");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const user = useSelector((state: RootState) => state.user);

  const onFinishSignIn = (values: Login) => {
    const { email, password } = values;
    dispatch(loginRequest({ email, password }));
    navigate("/home");
  };

  const onFinishSignUp = (values: Register) => {
    const { email, password, name } = values;
    dispatch(registerRequest({ email, password, name }));
    navigate("/home");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white w-[1100px] h-[566px] flex rounded-lg shadow-lg">
        {/* Left section */}
        <div className="w-1/2 rounded-tl-lg rounded-bl-lg shadow-lg background-image">
          <div className="content flex items-center justify-center h-full">
            <div className="text-center text-white">
              <h2 className="text-4xl font-semibold mb-4 text-white">
                Welcome Back!
              </h2>
              <p className="text-xl mb-4">
                Enter your personal details to start your journey with us
              </p>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="w-1/2 p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Toggle buttons */}
            <div className="w-full mb-4 flex justify-end">
              <Radio.Group
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                <Radio.Button
                  value="Sign In"
                  style={{
                    backgroundColor:
                      position === "Sign In" ? "#2563EB" : "#F3F4F6",
                    color: position === "Sign In" ? "white" : "black",
                  }}
                >
                  Sign In
                </Radio.Button>
                <Radio.Button
                  value="Sign Up"
                  style={{
                    backgroundColor:
                      position === "Sign Up" ? "#2563EB" : "#F3F4F6",
                    color: position === "Sign Up" ? "white" : "black",
                  }}
                >
                  Sign Up
                </Radio.Button>
              </Radio.Group>
            </div>

            {/* Render forms based on selected position */}
            {position === "Sign In" && <SignInForm onFinish={onFinishSignIn} />}
            {position === "Sign Up" && <SignUpForm onFinish={onFinishSignUp} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
