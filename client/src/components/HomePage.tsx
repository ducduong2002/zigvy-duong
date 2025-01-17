import "../assets/preview/stylesheets/css/Homepage.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/configureStore";
import { fetchUserProfileRequest } from "@/store/login/userSlice";
import { AppDispatch } from "../store/configureStore";
import TaskTable from "./TableTask";
import ModelCreateTask from "./ModelCreateTask";
import Header from "./Header";
const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  useEffect(() => {
    dispatch(fetchUserProfileRequest());
  }, [dispatch]);
  return (
    <div>
      {/* header */}
      <Header />
      {/* container */}
      <div className="bg-gray-200 w-full pt-20 pb-8">
        <div className="w-full px-20">
          <div className="flex justify-between items-center">
            <div>
              <h1>Welcome, {userInfo.name}</h1>
              <div>Manage and track your tasks efficiently</div>
            </div>
            <ModelCreateTask userId={userInfo._id} />
          </div>
          {/* table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-3"></div>
          <TaskTable userId={userInfo._id} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
