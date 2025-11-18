import { useEffect, useState } from "react";
import axios from "../config/axios";
import { Link } from "react-router-dom";

// shadcn components
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Project() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/projects");
        setProjects(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // ⭐ LOADING STATE (full grid skeletons)
  if (!projects)
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Skeleton className="h-10 w-40 mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card
              key={i}
              className="bg-slate-800 p-5 rounded-xl shadow-lg text-white"
            >
              <Skeleton className="w-full h-40 rounded-lg mb-4" />
              <Skeleton className="h-6 w-48 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </Card>
          ))}
        </div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-amber-300 mb-10">
        Projects
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((ele) => (
          <Card
            key={ele._id}
            className="bg-slate-800 text-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <CardHeader className="p-0">
              {ele.projectThumbNail && (
                <img
                  src={ele.projectThumbNail}
                  alt="thumbnail"
                  className="w-full h-48 object-cover rounded-t-xl border-b border-slate-700"
                />
              )}
            </CardHeader>

            <CardContent className="p-5">
              {/* Project Name */}
              <CardTitle className="text-xl text-white mb-2">
                {ele.projectName}
              </CardTitle>

              {/* Short Bio */}
              <p className="text-gray-300 mb-4 line-clamp-3">
                {ele.shortBio}
              </p>

              {/* View More Button */}
              <Link to={`/projects/${ele._id}`}>
                <Button className="w-full bg-amber-300 hover:bg-amber-400 text-black font-medium">
                  View More
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
