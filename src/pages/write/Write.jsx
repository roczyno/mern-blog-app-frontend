import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/Context";

import "./write.css";
import { useNavigate } from "react-router-dom";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post(
        "https://blogallday-api.onrender.com/api/posts",
        newPost
      );
      navigate("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="write-image" />
      )}
      <form className="write-form" onSubmit={handleSubmit}>
        <div className="write-form-group">
          <label htmlFor="file-input">
            <i className=" write-icon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="file-input"
            style={{ display: " none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="write-input"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="write-form-group">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="write-input write -text"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="write-submit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
