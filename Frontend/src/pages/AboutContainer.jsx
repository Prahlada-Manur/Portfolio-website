import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AboutContainer() {
  const { data, loading, errors } = useSelector((state) => state.about);

  if (loading) return <h2>Loading...</h2>;
  if (errors) return <h2>Error: {errors}</h2>;
  if (!data) return <h2>No About Information Available</h2>;

  return (
    <div>
    <Link to='/AboutForm'><button>Edit About</button></Link>
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
      <h3>Bio:</h3>
      <p>{data.bio}</p>
      <h3>Skills:</h3>
      <ul>
        {data.skills?.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <h3>Contact Information:</h3>
      <p>Email: {data.contactMe?.email}</p>
      <p>Phone: {data.contactMe?.phone}</p>
      <p>LinkedIn: {data.contactMe?.linkdIn}</p>
      <p>GitHub: {data.contactMe?.gitHub}</p>
      <h3>Resume:</h3>
      <a href={data.resumeLink} target="_blank" rel="noopener noreferrer">
        View Resume
      </a>
      <br />
      <a
        href={`${data.resumeLink}?download=true`}
        download
      >
        Download Resume
      </a>
    </div>
  );
}
