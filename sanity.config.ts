import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemas from "./sanity/schemas";

const config = defineConfig({
    projectId: 'disjy9zu',
    dataset: "production",
    title: "My Portfolio",
    apiVersion: "2025-07-01",
    basePath: "/admin",
    plugins: [structureTool()],
    schema: { types: schemas}
})

export default config;