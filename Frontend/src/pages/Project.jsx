import { useEffect, useState } from "react";
import axios from "../config/axios";
import { Link } from "react-router-dom";
//----------------------------------------------------------------------------------------
export default function Project() {
  const [project, setProject] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/projects");
        console.log(response.data);
        setProject(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  //--------------------------------------------------------------------------------------------------
  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {project.map((ele) => {
          return (
            <li key={ele._id}>
              <Link to={`/projects/${ele._id}`}>{ele.projectName}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
