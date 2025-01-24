import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Radio } from "antd";
import { useDispatch } from "react-redux";
import { loginRequest, signUpRequest } from "../store/login/userSlice";
import SignInForm from "../container/SignInForm";
import SignUpForm from "../container/SignUpForm";
import { AppDispatch } from "../store/configureStore";
import { Login, Register } from "@/container/type";
import Toast from "../components/Toast";
import img from "../assets/image/imgLogin.png"
const LoginPage: React.FC = () => {
  const [position, setPosition] = useState<"Sign In" | "Sign Up">("Sign In");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [toast, setToast] = useState({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const onFinishSignUp = async ({ email, password, name }: Register) => {
    try {
      await dispatch(signUpRequest({ email, password, name })).unwrap();
      showToast("SignUp successful! Redirecting to Login...", "success");
      setTimeout(() => {
        setPosition("Sign In");
      }, 1000);
    } catch (error) {
      showToast("create failed. Please try again.", "error");
    }
  };

  const onFinishSignIn = async ({ email, password }: Login) => {
    try {
      await dispatch(
        loginRequest({
          email,
          password,
        })
      ).unwrap();
      showToast("Login successful! Redirecting...", "success");
      setTimeout(() => {
        navigate("/task");
      }, 2000);
    } catch (error) {
      showToast("Login failed. Please try again.", "error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white w-[1100px] h-[566px] flex rounded-lg shadow-lg">
        {/* Left */}
        <div
          className="hidden lg:block w-1/2 rounded-tl-lg rounded-bl-lg shadow-lg text-center bg-cover bg-center h-auto"
          style={{
            backgroundImage: `url(${img})`,
            textAlign: "center",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "auto",
          }}
        >
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

        {/* Right */}
        <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
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

            {position === "Sign In" && <SignInForm onFinish={onFinishSignIn} />}
            {position === "Sign Up" && <SignUpForm onFinish={onFinishSignUp} />}
            <Toast
              message={toast.message}
              type={toast.type as "success" | "error"}
              isVisible={toast.isVisible}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
