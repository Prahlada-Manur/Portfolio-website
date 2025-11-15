import { useEffect, useState } from "react";
import axios from "../config/axios";
import { Link } from "react-router-dom";

export default function Project() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/projects");
        setProjects(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  if (!projects.length) return <p>Loading projects...</p>;

  return (
    <div>
      <h2>Projects</h2>

      {projects.map((ele) => (
        <div key={ele._id} style={{ marginBottom: "20px" }}>
          {ele.projectThumbNail && (
            <img src={ele.projectThumbNail} width="180" alt="thumbnail" />
          )}

          <h3>{ele.projectName}</h3>
          <p>{ele.shortBio}</p>

          <Link to={`/projects/${ele._id}`}>
            <button>View More</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
