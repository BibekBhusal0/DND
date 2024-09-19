import Dexie from "dexie";
import { projectType } from "../types/todo";

const db = new Dexie("TodoDatabase");
db.version(1).stores({
  projects: "++id, title, sorted, filtered",
});

export const projectsTable = db.table<projectType, number>("projects");
export default db;

export const saveProjects = async (projects: projectType[]) => {
  try {
    await db.table("projects").bulkPut(projects);
  } catch (error) {
    console.log("saving projects", error);
  }
};

export const saveProject = async (project: projectType) => {
  try {
    await db.table("projects").put(project);
  } catch (error) {
    console.log("error saving project", error);
  }
};

export const loadProjects = async () => {
  try {
    const projects = await db.table("projects").toArray();
    return projects;
  } catch {
    return null;
  }
};
