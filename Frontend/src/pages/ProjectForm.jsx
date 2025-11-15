import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  createProject,
  fetchProject,
  fetchProjectById,
  updateProject,
} from "../slices/projectSlice";

export default function ProjectForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { single, errors, loading } = useSelector((state) => state.project);

  const [form, setForm] = useState({
    projectName: "",
    shortBio: "",
    longBio: "",
    projectUrl: "",
    repourl: "",
    techStack: [],
    projectThumbNail: undefined,
  });

  const [tech, setTech] = useState("");
  const [saveCompleted, setSaveCompleted] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchProjectById(id));
  }, [id]);

  useEffect(() => {
    if (single && id) {
      setForm({
        projectName: single.projectName,
        shortBio: single.shortBio,
        longBio: single.longBio,
        projectUrl: single.projectUrl,
        repourl: single.repourl,
        techStack: single.techStack,
        projectThumbNail: undefined,
      });
    }
  }, [single]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTech = () => {
    if (tech.trim() !== "") {
      setForm({ ...form, techStack: [...form.techStack, tech.trim()] });
      setTech("");
    }
  };

  const removeTech = (i) => {
    setForm({
      ...form,
      techStack: form.techStack.filter((_, index) => index !== i),
    });
  };

  const handleSave = async () => {
    try {
      if (id) {
        await dispatch(updateProject({ id, Data: form })).unwrap();
      } else {
        await dispatch(createProject(form)).unwrap();
      }

      await dispatch(fetchProject()).unwrap();
      alert("Saved successfully!");

      setSaveCompleted(true);
    } catch (err) {
      console.log(err);
      alert("Error saving: " + err.message);
    }
  };

  const handleFinalSubmit = () => {
    navigate("/dashboard");
  };
 

  return (
    <div>
      <h2>{id ? "Edit Project" : "Create New Project"}</h2>
 {errors && <p style={{ color: "red", fontWeight: "bold" }}>{errors}</p> }
      <form>
        <input
          name="projectName"
          value={form.projectName}
          onChange={handleChange}
          placeholder="Project Name"
        />

        <input
          name="shortBio"
          value={form.shortBio}
          onChange={handleChange}
          placeholder="Short Bio"
        />

        <textarea
          name="longBio"
          value={form.longBio}
          onChange={handleChange}
          placeholder="Long Description"
        />

        <input
          name="projectUrl"
          value={form.projectUrl}
          onChange={handleChange}
          placeholder="Project URL"
        />

        <input
          name="repourl"
          value={form.repourl}
          onChange={handleChange}
          placeholder="Repository URL"
        />

        <h3>Tech Stack</h3>

        {form.techStack.map((t, i) => (
          <div key={i}>
            {t}{" "}
            <button type="button" onClick={() => removeTech(i)}>
              X
            </button>
          </div>
        ))}

        <input
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          placeholder="Add Tech"
        />

        <button type="button" onClick={addTech}>
          Add
        </button>

        <h3>Thumbnail</h3>
        <input
          type="file"
          onChange={(e) =>
            setForm({ ...form, projectThumbNail: e.target.files[0] })
          }
        />

        <br />
        <br />
        {loading && (
          <p style={{ color: "blue", fontWeight: "bold" }}>
            Uploading... Please wait...
          </p>
        )}

        <button type="button" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          disabled={!saveCompleted}
          onClick={handleFinalSubmit}
        >
          {id ? "Update Project" : "Create Project"}
        </button>
      </form>
    </div>
  );
}
