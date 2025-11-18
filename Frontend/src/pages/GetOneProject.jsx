import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../config/axios";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

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

  // ⭐ Loading State (Skeleton)
  if (!project)
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Skeleton className="h-10 w-64 mb-8" />

        <Skeleton className="w-full h-64 rounded-xl mb-8" />

        <Skeleton className="h-8 w-40 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-6" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Title */}
      <h1 className="text-3xl font-bold text-amber-300 mb-8">
        {project.projectName}
      </h1>

      {/* Thumbnail */}
      {project.projectThumbNail && (
        <Card className="bg-slate-900 p-4 rounded-xl shadow-lg border border-slate-700 mb-10">
          <img
            src={project.projectThumbNail}
            alt="Project Thumbnail"
            className="w-full max-h-[350px] object-cover rounded-lg shadow-md"
          />
        </Card>
      )}

      {/* Short Description */}
      <Card className="bg-slate-800 text-white shadow-lg rounded-xl mb-8">
        <CardHeader>
          <CardTitle className="text-amber-300">Short Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 leading-relaxed">
            {project.shortBio}
          </p>
        </CardContent>
      </Card>

      {/* Long Description */}
      <Card className="bg-slate-800 text-white shadow-lg rounded-xl mb-8">
        <CardHeader>
          <CardTitle className="text-amber-300">Long Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {project.longBio}
          </p>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card className="bg-slate-800 text-white shadow-lg rounded-xl mb-8">
        <CardHeader>
          <CardTitle className="text-amber-300">Tech Stack</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-3">
            {project.techStack?.map((tech, i) => (
              <Badge
                key={i}
                className="bg-slate-700 text-gray-200 px-4 py-2 shadow-sm"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Links */}
      <Card className="bg-slate-800 text-white shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-amber-300">Project Links</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-gray-300">

          {/* Live URL */}
          <div>
            <p className="font-semibold mb-1">Live Project:</p>
            <Button
              variant="link"
              className="text-amber-300 underline hover:text-amber-400 p-0"
              asChild
            >
              <a href={project.projectUrl} target="_blank" rel="noreferrer">
                Open Project →
              </a>
            </Button>
          </div>

          <Separator className="bg-slate-600" />

          {/* Repo URL */}
          <div>
            <p className="font-semibold mb-1">Repository:</p>
            <Button
              variant="link"
              className="text-amber-300 underline hover:text-amber-400 p-0"
              asChild
            >
              <a href={project.repourl} target="_blank" rel="noreferrer">
                View Repo →
              </a>
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
