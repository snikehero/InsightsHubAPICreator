import { Outlet, Link, NavLink } from "react-router";


export default function Layout() {
return (
<div className="app-layout">
<nav className="navbar">
<Link to="/" className="brand">TDCON40</Link>
<div className="nav-links">
<NavLink to="/create-aspect-type">Create Aspect Type </NavLink>
<NavLink to="/create-asset-type">Create Asset Type </NavLink>
<NavLink to="/create-asset">Create Asset </NavLink>
</div>
</nav>
<main className="page">
<Outlet />
</main>
</div>
);
}