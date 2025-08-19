import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
// A root layout that renders the navbar on every page
route("", "routes/layout.tsx", [
index("routes/home.tsx"),
route("create-aspect-type", "routes/CreateAspectType.tsx"),
route("create-asset-type", "routes/CreateAssetType.tsx"),
route("create-asset", "routes/CreateAsset.tsx"),
]),
] satisfies RouteConfig;