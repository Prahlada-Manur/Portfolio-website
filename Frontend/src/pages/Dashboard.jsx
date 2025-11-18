import AboutContainer from "./AboutContainer";
import ProjectContainer from "./ProjectContainer";

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-amber-300 mb-8 text-center">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <AboutContainer />
        <ProjectContainer />
      </div>
    </div>
  );
}
