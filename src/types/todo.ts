export interface todoType {
  id: number;
  task: string;
  checked: boolean;
}

export interface projectType {
  id: number;
  title: string;
  tasks: todoType[];
  max_id: number;
}

export interface todoStateType {
  projects: projectType[];
  max_id: number;
}

export type changeProjectType =
  | { project_id: number; change_item: "todo"; todo: todoType[] }
  | { project_id: number; change_item: "title"; title: string };
