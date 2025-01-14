import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the type for the response data
interface UserProfile {
  email: string;
  _id: string;
  token: string;
}
interface UserProfileMapProps {
  userId: string;
}

const Home: React.FC<UserProfileMapProps> = ({ userId })=> {
  const [userData, setUserData] = useState<UserProfile | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:3002/user/profile/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);
  // If data is not loaded yet, show a loading message
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <strong>Email:</strong> {userData.email}
      </div>
      <div>
        <strong>_id:</strong> {userData._id}
      </div>
      <div>
        <strong>Token:</strong> {userData.token}
      </div>
    </div>
  );
};

export default Home;
