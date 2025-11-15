import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectById, deleteProject } from "../slices/projectSlice";
export default function ProjectSpecific() {
  const { single, loading, errors } = useSelector((state) => {
    return state.project;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id]);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      dispatch(deleteProject(id));
      navigate("/dashboard");
    }
  };

  if (loading || !single) {
    return <p>loading.......</p>;
  }
  return (
    <div>
      <h2>{single.projectName}</h2>

      <img src={single.projectThumbNail} width="250" />

      <p>{single.shortBio}</p>
      <p>{single.longBio}</p>

      <h3>Tech Stack</h3>
      <ul>
        {single.techStack.map((ele, i) => (
          <li key={i}>{ele}</li>
        ))}
      </ul>

      <p>
        Project URL:{" "}
        <a href={single.projectUrl} target="_blank">
          Open
        </a>
      </p>
      <p>
        Repo URL:
        <a href={single.repourl} target="_blank">
          View Repo
        </a>
      </p>

      <br />
      <button>
        <Link to={`/dashboard/specific/${id}/edit`}>Edit Project</Link>
      </button>

      <button
        onClick={() => {
          handleDelete(id);
        }}
      >
        Delete Project
      </button>
    </div>
  );
}
