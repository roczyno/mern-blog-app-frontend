import "./post.css";
import { Link } from "react-router-dom";
export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && (
        <img src={PF + post.photo} alt="" className="post-image" />
      )}
      <div className="post-info">
        <div className="post-cats">
          {post.category?.map((c) => (
            <span className="post-cat">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="post-title">{post.title}</span>
        </Link>
        <span className="post-date">
          {new Date(post.createdAt).toDateString}
        </span>
      </div>
      <p className="post-desc">{post.desc}</p>
    </div>
  );
}
