import { useEffect, useState } from "react";
import axios from "../config/axios";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { Skeleton } from "../components/ui/skeleton";

export default function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/about");
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  if (!data)
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Skeleton className="h-10 w-40 mb-6" />
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-72" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* About Heading */}
      <h2 className="text-3xl font-bold text-amber-300 mb-6">About Me</h2>

      {/* PROFILE CARD */}
      <Card className="bg-slate-800 text-white shadow-lg rounded-2xl">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-5">

          {/* Avatar */}
          <Avatar className="h-40 w-40 border-4 border-amber-300 shadow-lg">
            <AvatarImage src={data.portfolioPicUrl} alt="Profile" />
            <AvatarFallback className="text-4xl bg-slate-700">
              {data.name[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="text-2xl font-semibold mb-2">{data.name}</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {data.bio}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SKILLS */}
      <Card className="bg-slate-800 text-white shadow-lg rounded-xl mt-8">
        <CardHeader>
          <CardTitle className="text-amber-300">Skills</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-3 mt-2">
            {data.skills?.map((skill, index) => (
              <Badge key={index} className="bg-slate-700 text-gray-200 px-4 py-2 shadow-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CONTACT INFORMATION */}
      <Card className="bg-slate-800 text-white shadow-lg rounded-xl mt-8">
        <CardHeader>
          <CardTitle className="text-amber-300">
            Contact Information
          </CardTitle>
        </CardHeader>

        <CardContent className="text-gray-300 space-y-3">

          <div>
            <span className="font-semibold">Email:</span> {data.contactMe?.email}
          </div>
          <Separator className="bg-slate-600" />

          <div>
            <span className="font-semibold">Phone:</span> {data.contactMe?.phone}
          </div>
          <Separator className="bg-slate-600" />

          <div>
            <span className="font-semibold">LinkedIn:</span> {data.contactMe?.linkdIn}
          </div>
          <Separator className="bg-slate-600" />

          <div>
            <span className="font-semibold">GitHub:</span> {data.contactMe?.gitHub}
          </div>

        </CardContent>
      </Card>

      {/* RESUME */}
      <Card className="bg-slate-800 text-white shadow-lg rounded-xl mt-8">
        <CardHeader>
          <CardTitle className="text-amber-300">Resume</CardTitle>
        </CardHeader>

        <CardContent>

          {data.resumeLink ? (
            <div className="flex gap-4">

              <Button variant="link" className="text-amber-300 underline p-0"
                asChild>
                <a href={data.resumeLink} target="_blank">
                  View Resume
                </a>
              </Button>

              <Button variant="link" className="text-amber-300 underline p-0"
                asChild>
                <a href={`${data.resumeLink}?download=true`} download>
                  Download Resume
                </a>
              </Button>

            </div>
          ) : (
            <p className="text-gray-400">No resume uploaded</p>
          )}

        </CardContent>
      </Card>

    </div>
  );
}
