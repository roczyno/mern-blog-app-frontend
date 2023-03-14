import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./singlePost.css";
import { UserContext } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updatemode, setUpdateMode] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPosts();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://blogallday-api.onrender.com/api/posts/${post._id}`,
        {
          username: user.username,
          title,
          desc,
        }
      );
      updatemode(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user.username);
  return (
    <div className="single-post">
      <div className="single-post-wrappper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="single-post-image" />
        )}
        {updatemode ? (
          <input
            type="text"
            value={title}
            className="single-post-title-input"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="single-post-title">
            {title}

            {
              (post.username = user?.username && (
                <div className="single-post-edit">
                  <i
                    className="far fa-edit single-post-icon"
                    onClick={() => setUpdateMode(true)}
                  ></i>
                  <i
                    className="far fa-trash-alt single-post-icon"
                    onClick={handleDelete}
                  ></i>
                </div>
              ))
            }
          </h1>
        )}
        <div className="single-post-info">
          <span className="single-post-author">
            Owner:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="single-post-date">
            {new Date(post.createdAt).toDateString}
          </span>
        </div>
        {updatemode ? (
          <textarea
            className="single-post-desc-input"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="single-post-desc">{desc}</p>
        )}
        {updatemode && (
          <button className="single-post-button" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
