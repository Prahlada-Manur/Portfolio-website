import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../config/axios";

export default function GetOneProject() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/project/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  if (!project) return <div>Loading project...</div>;

  return (
    <div>
      <h1>{project.projectName}</h1>

      {project.projectThumbNail && (
        <img
          src={project.projectThumbNail}
          width="250"
          alt="Project Thumbnail"
        />
      )}

      <h3>Short Description</h3>
      <p>{project.shortBio}</p>

      <h3>Long Description</h3>
      <p>{project.longBio}</p>

      <h3>Tech Stack</h3>
      <ul>
        {project.techStack?.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>

      <h3>Links</h3>
      <p>
        Project URL:{" "}
        <a href={project.projectUrl} target="_blank" rel="noreferrer">
          Open Project
        </a>
      </p>

      <p>
        Repository:{" "}
        <a href={project.repourl} target="_blank" rel="noreferrer">
          View Repo
        </a>
      </p>
    </div>
  );
}
