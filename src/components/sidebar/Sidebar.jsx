import { useEffect, useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      const res = await axios.get("/cat");
      setCat(res.data);
    };
    getCat();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <span className="sidebar-title">About Me</span>
        <img
          src="https://images.unsplash.com/photo-1568219121325-7cb2b085b641?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, minus
          incidunt accusamus quo animi commodi ut.
        </p>
      </div>
      <div className="sidebar-item">
        <span className="sidebar-title">CATEGORIES</span>
        <ul className="sidebar-list">
          {cat.map((c) => (
            <Link className="link" to={`/?cat=${c.name}`}>
              <li className="sidebar-list-item">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebar-item">
        <span className="sidebar-title">Follow Us</span>
        <div className="sidebar-social-container">
          <i className="fa-brands fa-facebook sidebar-icon"></i>
          <i className="fa-brands fa-linkedin sidebar-icon"></i>
          <i className="fa-brands fa-github sidebar-icon"></i>
          <i className="fa-brands fa-twitter sidebar-icon"></i>
        </div>
      </div>
    </div>
  );
}
