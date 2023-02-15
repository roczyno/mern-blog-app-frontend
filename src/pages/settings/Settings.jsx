import { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./settings.css";
import { UserContext } from "../../context/Context";

import axios from "axios";

export default function Settings() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { user, dispatch } = useContext(UserContext);
  const PF = "http://localhost:5000/images/";

  const handleUpdate = async (e) => {
    dispatch({ type: "UPDATE_START" });
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError(true);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settings-wrapper">
        <div className="settings-title">
          <div className="settings-update-title">Update Your Account</div>
          <div className="settings-delete-title">Delete Your Account</div>
        </div>
        <form className="settings-form" onSubmit={handleUpdate}>
          <label>Profile Picture</label>
          <div className="settings-profile-picture">
            <img
              alt=""
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
            />
            <label htmlFor="file-input">
              <i className="far fa-user-circle settings-profile-picture-icon"></i>
              <input
                type="file"
                id="file-input"
                style={{ display: " none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>

          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settings-submit" type="submit">
            Update
          </button>
        </form>
        {success && (
          <span style={{ color: "green" }}>Updated successfully</span>
        )}
        {error && <span style={{ color: "red" }}>Error updating</span>}
      </div>
      <Sidebar />
    </div>
  );
}
