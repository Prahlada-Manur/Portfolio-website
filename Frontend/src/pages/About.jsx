import { useEffect, useState } from "react";
import axios from "../config/axios";

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

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>About Information</h2>

      <h3>Name: {data.name}</h3>

      {data.portfolioPicUrl && (
        <div>
          <p>Profile Picture:</p>
          <img
            src={data.portfolioPicUrl}
            alt="Profile"
            width="150"
            height="150"
          />
        </div>
      )}

      <h3>Bio</h3>
      <p>{data.bio}</p>

      <h3>Skills</h3>
      <ul>
        {data.skills?.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h3>Contact Information</h3>
      <p>Email: {data.contactMe?.email}</p>
      <p>Phone: {data.contactMe?.phone}</p>
      <p>LinkedIn: {data.contactMe?.linkdIn}</p>
      <p>GitHub: {data.contactMe?.gitHub}</p>

      <h3>Resume</h3>
      {data.resumeLink ? (
        <>
          <a href={data.resumeLink} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
          <br />
          <a href={`${data.resumeLink}?download=true`} download>
            Download Resume
          </a>
        </>
      ) : (
        <p>No resume uploaded</p>
      )}
    </div>
  );
}
