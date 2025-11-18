import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectById, deleteProject } from "../slices/projectSlice";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ProjectSpecific() {
  const { single, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id]);

  if (loading || !single) return <p className="text-gray-300">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Title */}
      <h2 className="text-3xl font-bold text-amber-300 mb-8">
        {single.projectName}
      </h2>

      {/* Thumbnail */}
      {single.projectThumbNail && (
        <img
          src={single.projectThumbNail}
          alt="Project Thumbnail"
          className="w-full max-h-[350px] object-cover rounded-xl shadow-lg border border-slate-700 mb-10"
        />
      )}

      {/* Short Description */}
      <Card className="bg-slate-800 text-white shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-amber-300">Short Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">{single.shortBio}</p>
        </CardContent>
      </Card>

      {/* Long Description */}
      <Card className="bg-slate-800 text-white shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-amber-300">Long Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 whitespace-pre-line">{single.longBio}</p>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card className="bg-slate-800 text-white shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-amber-300">Tech Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {single.techStack?.map((tech, i) => (
              <Badge key={i} className="bg-slate-700 text-gray-200 px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Links */}
      <Card className="bg-slate-800 text-white shadow-lg mb-10">
        <CardHeader>
          <CardTitle className="text-amber-300">Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-gray-300">
          {/* Live Project */}
          <p>
            <span className="font-semibold">Live Project: </span>
            <a
              href={single.projectUrl}
              target="_blank"
              className="text-amber-300 underline hover:text-amber-400"
            >
              Open →
            </a>
          </p>

          {/* Repo */}
          <p>
            <span className="font-semibold">Repository: </span>
            <a
              href={single.repourl}
              target="_blank"
              className="text-amber-300 underline hover:text-amber-400"
            >
              View Repo →
            </a>
          </p>
        </CardContent>
      </Card>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link to={`/dashboard/specific/${id}/edit`}>
          <Button className="bg-amber-300 text-black hover:bg-amber-400">
            Edit Project
          </Button>
        </Link>

        {/* DELETE WITH SHADCN ALERTDIALOG */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="bg-red-500 hover:bg-red-600"
            >
              Delete Project
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="bg-slate-800 text-white border border-slate-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-amber-300">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300">
                This action cannot be undone. This will permanently delete the
                project{" "}
                <span className="font-semibold text-white">
                  "{single.projectName}"
                </span>{" "}
                from your dashboard.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel className="bg-amber-300 text-black hover:bg-amber-500">
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={() => {
                  dispatch(deleteProject(id));
                  navigate("/dashboard");
                }}
              >
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
