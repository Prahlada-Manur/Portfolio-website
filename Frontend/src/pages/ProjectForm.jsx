import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  createProject,
  fetchProject,
  fetchProjectById,
  updateProject,
} from "../slices/projectSlice";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

  // Load project for edit
  useEffect(() => {
    if (id) dispatch(fetchProjectById(id));
  }, [id]);

  // Populate form
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addTech = () => {
    if (tech.trim()) {
      setForm({ ...form, techStack: [...form.techStack, tech.trim()] });
      setTech("");
    }
  };

  const removeTech = (i) => {
    setForm({
      ...form,
      techStack: form.techStack.filter((_, idx) => idx !== i),
    });
  };

  // Save
  const handleSave = async () => {
    try {
      if (id) {
        await dispatch(updateProject({ id, Data: form })).unwrap();
      } else {
        await dispatch(createProject(form)).unwrap();
      }

      await dispatch(fetchProject()).unwrap();
      alert("Project saved!");
      setSaveCompleted(true);
    } catch (err) {
      alert("Error saving project");
      console.log(err);
    }
  };

  const handleFinalSubmit = () => navigate("/dashboard");

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Title */}
      <h2 className="text-3xl font-bold text-amber-300 mb-8">
        {id ? "Edit Project" : "Create New Project"}
      </h2>

      {errors && (
        <p className="text-red-400 font-medium mb-4">{errors}</p>
      )}

      {/* Form Card */}
      <Card className="bg-slate-800 text-white shadow-lg">
        <CardContent className="p-8 space-y-8">

          {/* Project Name */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Project Name</label>
            <Input
              name="projectName"
              value={form.projectName}
              onChange={handleChange}
              className="bg-slate-700 text-white border-slate-600"
              placeholder="Enter project name"
            />
          </div>

          {/* Short Bio */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Short Bio</label>
            <Input
              name="shortBio"
              value={form.shortBio}
              onChange={handleChange}
              className="bg-slate-700 text-white border-slate-600"
              placeholder="Short description"
            />
          </div>

          {/* Long Description */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Long Description</label>
            <Textarea
              name="longBio"
              value={form.longBio}
              onChange={handleChange}
              rows="5"
              placeholder="Write a detailed description..."
              className="bg-slate-700 text-white border-slate-600"
            />
          </div>

          <Separator className="bg-slate-600" />

          {/* URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              name="projectUrl"
              value={form.projectUrl}
              onChange={handleChange}
              placeholder="Project URL"
              className="bg-slate-700 text-white border-slate-600"
            />
            <Input
              name="repourl"
              value={form.repourl}
              onChange={handleChange}
              placeholder="Repository URL"
              className="bg-slate-700 text-white border-slate-600"
            />
          </div>

          <Separator className="bg-slate-600" />

          {/* Tech Stack */}
          <div>
            <h3 className="text-xl font-semibold text-amber-300 mb-3">Tech Stack</h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {form.techStack.map((t, i) => (
                <Badge
                  key={i}
                  className="bg-slate-700 text-gray-200 flex items-center gap-2 px-3 py-1"
                >
                  {t}
                  <span
                    onClick={() => removeTech(i)}
                    className="cursor-pointer text-red-400 hover:text-red-500"
                  >
                    ✕
                  </span>
                </Badge>
              ))}
            </div>

            {/* Add Tech */}
            <div className="flex gap-2">
              <Input
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                placeholder="Add technology"
                className="bg-slate-700 text-white border-slate-600"
              />
              <Button
                type="button"
                onClick={addTech}
                className="bg-amber-300 text-black hover:bg-amber-400"
              >
                Add
              </Button>
            </div>
          </div>

          <Separator className="bg-slate-600" />

          {/* Thumbnail Upload */}
          <div>
            <h3 className="text-xl font-semibold text-amber-300 mb-2">Thumbnail</h3>
            <Input
              type="file"
              onChange={(e) =>
                setForm({ ...form, projectThumbNail: e.target.files[0] })
              }
              className="text-gray-300 bg-slate-700 border-slate-600"
            />
          </div>

          {/* Loader */}
          {loading && (
            <p className="text-blue-400 font-medium">Uploading... Please wait...</p>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              disabled={loading}
              onClick={handleSave}
              className={`px-6 py-2 font-medium ${
                loading
                  ? "bg-gray-500"
                  : "bg-amber-300 hover:bg-amber-400 text-black"
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </Button>

            <Button
              type="button"
              disabled={!saveCompleted}
              onClick={handleFinalSubmit}
              className={`px-6 py-2 font-medium text-white ${
                !saveCompleted
                  ? "bg-gray-500"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {id ? "Update Project" : "Create Project"}
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
