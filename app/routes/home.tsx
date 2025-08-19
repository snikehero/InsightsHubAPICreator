import type { Route } from "./+types/home";
import { Link } from "react-router";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export default function Home() {
  return (
    <div className="home">
      <section className="welcome">
        <h1>Welcome to Dynamic Form Builder</h1>
        <p>Select an option above to get started.</p>
      </section>
    </div>
  );
}

