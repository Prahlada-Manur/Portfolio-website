import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

export default function AboutContainer() {
  const { data, loading, errors } = useSelector((state) => state.about);

  if (loading)
    return (
      <Card className="bg-slate-800 p-6 rounded-xl shadow-lg">
        <Skeleton className="h-6 w-40 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </Card>
    );

  if (errors)
    return <h2 className="text-red-400">Error: {errors}</h2>;

  if (!data)
    return <h2 className="text-gray-300">No About Information Available</h2>;

  return (
    <Card className="bg-slate-800 text-white shadow-lg rounded-xl">

      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-amber-300">About Information</CardTitle>

        <Link to="/aboutForm">
          <Button className="bg-amber-300 text-black hover:bg-amber-400">
            Edit About
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="text-gray-200 space-y-4">

        {/* Name */}
        <p>
          <span className="font-semibold">Name:</span> {data.name}
        </p>

        {/* Profile Image */}
        {data.portfolioPicUrl && (
          <img
            src={data.portfolioPicUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-amber-300 shadow mb-4"
          />
        )}

        {/* Bio */}
        <div>
          <h3 className="text-lg font-semibold text-amber-300">Bio</h3>
          <p>{data.bio}</p>
        </div>

        <Separator className="bg-slate-600" />

        {/* Skills */}
        <div>
          <h3 className="text-lg font-semibold text-amber-300">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills?.map((skill, i) => (
              <Badge key={i} className="bg-slate-700 text-gray-200 px-3 py-1 shadow">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="bg-slate-600" />

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-amber-300">Contact Information</h3>
          <p>Email: {data.contactMe?.email}</p>
          <p>Phone: {data.contactMe?.phone}</p>
          <p>LinkedIn: {data.contactMe?.linkdIn}</p>
          <p>GitHub: {data.contactMe?.gitHub}</p>
        </div>

        <Separator className="bg-slate-600" />

        {/* Resume */}
        <div>
          <h3 className="text-lg font-semibold text-amber-300">Resume</h3>

          <a
            href={data.resumeLink}
            target="_blank"
            className="text-amber-300 underline hover:text-amber-400"
          >
            View Resume
          </a>
          <br />

          <a
            href={`${data.resumeLink}?download=true`}
            download
            className="text-amber-300 underline hover:text-amber-400"
          >
            Download Resume
          </a>
        </div>

      </CardContent>
    </Card>
  );
}
