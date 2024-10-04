import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UpdateForm from "../components/auth/UpdateForm";

const Profile = () => {
  const [userEmail, setEmail] = useState("Email goes here");
  const [match, setMatch] = useState(true);
  const [updated, setUpdated] = useState(false)
  const [userId, setUserId] = useState();
  const nav = useNavigate()

  useEffect(() => {
    axios.get("/api/session-check").then((res) => {
      console.log("here is the user's id", res.data.userId);
      setUserId(res.data.userId);
      axios.get(`/api/user-info/${res.data.userId}`).then((res) => {
        if (res.data.success) {
          console.log("Here is their Email", res.data);
          setEmail(res.data.email);
        } else {
          console.log("error. success: ", res.data.success);
        }
      });
    });
  }, []);

  const handleProfileUpdate = (e, formdata) => {
    console.log("handleProfileUpdate: ", formdata);
    event.preventDefault();
    let { email, password, confirmPassword } = formdata;
    formdata.id = userId
    if (email === "") {
      email = userEmail;
      console.log(userEmail);
      console.log(email);
    }
    if (password === confirmPassword && password !== "") {
      formdata.email = email
      console.log("handleProfileUpdate: ", formdata);
      axios.put("/api/update-user", formdata).then((res) => {
        if (res.data.success) {
          console.log("res.data: ", res.data);
          setMatch(true);
          setUpdated(true)
          nav("/profile");
        } else {
          console.log("Registration failed");
          setUpdated(false)
          setMatch(true);
        }
      });
    } else {
      setMatch(false);
      setUpdated(false)
      console.log("Passwords do not match");
    }
  };

  return match ? (
    <>
    <div className="flex flex-col items-center">
      <div className="text-lg my-3">Hello {userEmail} welcome to your profile</div>
      <div className="font-bold text-2xl my-3">Update Profile</div>
      <UpdateForm onUpdate={handleProfileUpdate} userId={userId} />
      {updated && (
        <>
          <div>Updated</div>
        </>
        
      )}
    </div>
    </>
  ) : (
    <>
    <div className="flex flex-col items-center">
      <div className="text-lg my-3">Hello {userEmail} welcome to your profile</div>
      <div className="font-bold text-2xl my-3">Update Profile</div>
      <UpdateForm onUpdate={handleProfileUpdate} />
      <div>Bad Passwords</div>
    </div>
      
    </>
  );
};

export default Profile;
