import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../config/axios";

export default function GetOneProject() {
  const { id } = useParams();
  const [project, setProject] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/project/${id}`);
        console.log(res.data);
        setProject(res.data)
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  if (!project) return <div>Loading project...</div>;

  return (
    <div>
      <h1>{project.projectName}</h1>
      <p>{project.longBio}</p>

    </div>
  );
}
