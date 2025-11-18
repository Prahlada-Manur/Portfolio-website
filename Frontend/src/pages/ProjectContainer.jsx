import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectContainer() {
  const { data, loading } = useSelector((state) => state.project);

  if (loading)
    return (
      <Card className="bg-slate-800 p-6 rounded-xl shadow-lg">
        <Skeleton className="h-6 w-40 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </Card>
    );

  return (
    <Card className="bg-slate-800 text-white shadow-lg rounded-xl">

      {/* Header */}
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-amber-300">Projects</CardTitle>

        <Link to="/dashboard/add">
          <Button className="bg-amber-300 text-black hover:bg-amber-400">
            Add New Project
          </Button>
        </Link>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">

          {data?.map((ele) => (
            <Card
              key={ele._id}
              className="bg-slate-700 p-4 rounded-lg shadow hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {ele.projectName}
              </h3>

              {ele.projectThumbNail && (
                <img
                  src={ele.projectThumbNail}
                  alt="thumbnail"
                  className="w-full h-48 object-cover rounded-lg border border-slate-600 mb-3"
                />
              )}

              <p className="text-gray-300 mb-3">
                {ele.shortBio}
              </p>

              <Link to={`/dashboard/specific/${ele._id}`}>
                <Button className="bg-amber-300 text-black hover:bg-amber-400">
                  View Details
                </Button>
              </Link>
            </Card>
          ))}

        </div>
      </CardContent>
    </Card>
  );
}
