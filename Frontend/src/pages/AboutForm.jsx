import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAbout, updateAbout } from "../slices/aboutSlice";
import axios from "../config/axios";

import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import Swal from "sweetalert2";   // ⭐ SweetAlert2 import

export default function AboutForm() {
  const { data } = useSelector((state) => state.about);
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ⭐ SweetAlert — Form Save
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

    Swal.fire({
      title: "Profile Updated!",
      text: "Your About information has been saved successfully.",
      icon: "success",
      background: "#0f172a",
      color: "#fff",
      confirmButtonColor: "#fbbf24",
    });
    
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setForm({ ...form, skills: [...form.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (id) => {
    setForm({
      ...form,
      skills: form.skills.filter((_, i) => i !== id),
    });
  };

  // ⭐ SweetAlert — Upload Profile Pic
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

    dispatch(fetchAbout());

    Swal.fire({
      title: "Profile Picture Updated!",
      icon: "success",
      text: "Your new profile picture has been uploaded.",
      background: "#0f172a",
      color: "#fff",
      confirmButtonColor: "#fbbf24",
    });
  };

  // ⭐ SweetAlert — Upload Resume
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

    Swal.fire({
      title: "Resume Uploaded!",
      icon: "success",
      text: "Your resume has been uploaded successfully.",
      background: "#0f172a",
      color: "#fff",
      confirmButtonColor: "#fbbf24",
    });
  };

  if (!data) return <p className="text-gray-300">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      <h4 className="text-3xl font-bold text-amber-300 mb-8">
        Edit About Information
      </h4>

      <Card className="bg-slate-800 text-white shadow-lg rounded-xl">
        <CardContent className="p-8 space-y-8">

          {/* Name */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Name</label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="bg-slate-700 text-white border-slate-600"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Bio</label>
            <Textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows="5"
              className="bg-slate-700 text-white border-slate-600"
            />
          </div>

          <Separator className="bg-slate-600" />

          {/* Skills */}
          <div>
            <h3 className="text-xl font-semibold text-amber-300 mb-3">Skills</h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {form.skills.map((skill, i) => (
                <Badge
                  key={i}
                  className="bg-slate-700 text-gray-200 flex items-center gap-2 px-3 py-1"
                >
                  {skill}
                  <span
                    onClick={() => removeSkill(i)}
                    className="cursor-pointer text-red-400 hover:text-red-500"
                  >
                    ✕
                  </span>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="bg-slate-700 text-white border-slate-600"
                placeholder="Add new skill"
              />
              <Button
                type="button"
                onClick={addSkill}
                className="bg-amber-300 text-black hover:bg-amber-400"
              >
                Add
              </Button>
            </div>
          </div>

          <Separator className="bg-slate-600" />

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-amber-300 mb-3">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="bg-slate-700 text-white border-slate-600"
              />
              <Input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="bg-slate-700 text-white border-slate-600"
              />
              <Input
                name="gitHub"
                value={form.gitHub}
                onChange={handleChange}
                placeholder="GitHub"
                className="bg-slate-700 text-white border-slate-600"
              />
              <Input
                name="linkdIn"
                value={form.linkdIn}
                onChange={handleChange}
                placeholder="LinkedIn"
                className="bg-slate-700 text-white border-slate-600"
              />
            </div>
          </div>

          <Separator className="bg-slate-600" />

          {/* Profile Pic Upload */}
          <div>
            <h3 className="text-xl font-semibold text-amber-300 mb-2">
              Profile Picture
            </h3>
            <Input
              type="file"
              onChange={(e) => uploadProfilePic(e.target.files[0])}
              className="text-gray-300 bg-slate-700 border-slate-600"
            />
          </div>

          {/* Resume Upload */}
          <div>
            <h3 className="text-xl font-semibold text-amber-300 mb-2">
              Upload Resume
            </h3>
            <Input
              type="file"
              onChange={(e) => uploadResume(e.target.files[0])}
              className="text-gray-300 bg-slate-700 border-slate-600"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-amber-300 text-black hover:bg-amber-400 px-6 py-2"
            >
              Save Changes
            </Button>

            <Button
              type="button"
              className="bg-gray-600 text-white hover:bg-gray-700 px-6 py-2"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
