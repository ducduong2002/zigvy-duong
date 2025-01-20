import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/configureStore";
import { fetchUserProfileRequest } from "@/store/login/userSlice";
import { AppDispatch } from "../store/configureStore";
import TaskTable from "../components/TableTask";
import ModelCreateTask from "../components/ModelCreateTask";
import Header from "../components/Header";
import InputSearch from "../components/InputSearch";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    dispatch(fetchUserProfileRequest());
  }, [dispatch]);

  return (
    <div>
      {/* Header */}
      <Header />

      {/* Container */}
      <div className="bg-gray-200 w-full pt-20 pb-8">
        <div className="w-full px-10 lg:px-20">
          <div className="flex justify-between items-center">
            {/* Search Bar */}
            <div>
              <h1 className="text-2xl font-semibold">
                Welcome, {userInfo ? userInfo.name : ""}
              </h1>
              <div className="text-gray-600">
                Manage and track your tasks efficiently
              </div>
            </div>
            {/* Button for Creating Task */}
            {userInfo && <ModelCreateTask userId={userInfo._id} />}
          </div>
          <div>
            <InputSearch />
          </div>

          {/* Task Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-3">
            {userInfo && <TaskTable userId={userInfo._id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
