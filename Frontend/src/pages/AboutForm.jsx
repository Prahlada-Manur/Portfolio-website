import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAbout, updateAbout } from "../slices/aboutSlice";
import axios from "../config/axios";
export default function AboutForm() {
  const { data, errors } = useSelector((state) => {
    return state.about;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    bio: "",
    skills: [],
    email: "",
    phone: "",
    gitHub: "",
    linkdIn: "",
  });
  const [newSkill, setNewSkill] = useState("");
  //-------------------------------------------------------------------------------
  useEffect(() => {
    if (!data) {
      dispatch(fetchAbout());
    } else {
      setForm({
        name: data.name || "",
        bio: data.bio || "",
        skills: data.skills || [],
        email: data.contactMe?.email || "",
        phone: data.contactMe?.phone || "",
        gitHub: data.contactMe?.gitHub || "",
        linkdIn: data.contactMe?.linkdIn || "",
      });
    }
  }, [data]);
  //---------------------------------------------------------------------------------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      bio: form.bio,
      skills: form.skills,
      contactMe: {
        email: form.email,
        phone: form.phone,
        gitHub: form.gitHub,
        linkdIn: form.linkdIn,
      },
    };

    await dispatch(updateAbout(payload));
    navigate("/dashboard");
  };
  //--------------------------------------------------------------------------------------------------
  const addSkill = () => {
    if (newSkill.trim()) {
      setForm({ ...form, skills: [...form.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (id) => {
    setForm({
      ...form,
      skills: form.skills.filter((undefined, idx) => idx !== id),
    });
  };
  //--------------------------------------------------------------------------------------
  const uploadProfilePic = async (file) => {
    if (!file) return;

    const fd = new FormData();
    fd.append("portfolioPicUrl", file);

    await axios.post("/api/uploadPic", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("token"),
      },
    });

    dispatch(fetchAbout()); // refresh updated profile pic
    alert("Profile picture updated");
  };
  //---------------------------------------------------------------------------------------
  const uploadResume = async (file) => {
    if (!file) return;

    const fd = new FormData();
    fd.append("resumeLink", file);

    await axios.post("/api/upload/resume", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("token"),
      },
    });

    dispatch(fetchAbout());
    alert("Resume updated");
  };

  //----------------------------------------------------------------------------------------------
  if (!data) return <p>Loading...</p>;
  //-----------------------------------------------------------------------------------------
  return (
    <div>
      <h4>About edit form</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <textarea name="bio" value={form.bio} onChange={handleChange} />
        </div>

        <h3>Skills</h3>
        {form.skills.map((ele, i) => (
          <div key={i}>
            {ele}
            <button type="button" onClick={() => removeSkill(i)}>
              X
            </button>
          </div>
        ))}

        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill"
        />
        <button type="button" onClick={addSkill}>
          Add Skill
        </button>

        <h3>Contact</h3>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          name="gitHub"
          value={form.gitHub}
          onChange={handleChange}
          placeholder="GitHub"
        />
        <input
          name="linkdIn"
          value={form.linkdIn}
          onChange={handleChange}
          placeholder="LinkedIn"
        />

        <h3>Profile Picture</h3>
        <input
          type="file"
          onChange={(e) => uploadProfilePic(e.target.files[0])}
        />

        <h3>Resume</h3>
        <input type="file" onChange={(e) => uploadResume(e.target.files[0])} />

        <br />
        <br />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => navigate("/dashboard")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
