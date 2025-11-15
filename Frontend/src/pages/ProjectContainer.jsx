import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function ProjectContainer() {
  const { data, loading,errors } = useSelector((state) => {
    return state.project;
  });
  if (loading) {
    return <p>Loading................</p>;
  }


  return (
    <div>
      <h2>Projects</h2>

      <button>
        <Link to="/dashboard/add">Add New Project</Link>
      </button>

      {data?.map((ele) => (
        <div key={ele._id}>
          <h3>{ele.projectName}</h3>
          <img src={ele.projectThumbNail} width="150" />
          <p>{ele.shortBio}</p>

          <button>
            <Link to={`/dashboard/specific/${ele._id}`}>View</Link>
          </button>
        </div>
      ))}
    </div>
  );
}
