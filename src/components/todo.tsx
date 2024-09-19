// import { Card, CardHeader } from "grommet";
import { projectType, todoType } from "../types/todo";
import { useDispatch } from "react-redux";
import {
  changeProject,
  deleteTodo,
  changeTodo,
  toggleTodo,
  deleteProject,
  addTodo,
} from "../redux/todoSlice";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { AnimatePresence, Reorder } from "framer-motion";
import SortableCheckbox from "./checkbox";
import { Card, CardHeader } from "@mui/material";

export const transparentInput =
  "border-transparent w-full bg-transparent resize-none focus:outline-none";

function Project({ id, title, tasks }: projectType) {
  const dispatch = useDispatch();

  const addTodoItem = () => {
    dispatch(addTodo({ project_id: id, task: "" }));
  };
  const deleteThis = () => {
    dispatch(deleteProject(id));
  };
  return (
    <Card className="border-2 h-80 border-green-600 p-3">
      <CardHeader justify="between">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTodoItem();
            } else if (
              (e.key === "Escape" || e.key === "Backspace") &&
              title.trim() === "" &&
              tasks.length === 0
            ) {
              e.preventDefault();
              deleteThis();
            }
          }}
          className={`${transparentInput} text-3xl`}
          type="text"
          autoFocus={title.trim() === ""}
          placeholder="Title Here"
          value={title}
          onChange={(e) =>
            dispatch(
              changeProject({
                project_id: id,
                change_item: "title",
                title: e.target.value,
              })
            )
          }
        />
        <div className="flex gap-3">
          <DeleteIcon
            className="text-2xl cursor-pointer"
            onClick={deleteThis}
          />

          <AddCircleOutlineRoundedIcon
            className="text-2xl cursor-pointer"
            onClick={addTodoItem}
          />
        </div>
      </CardHeader>
      <div className="overflow-auto scroll-container py-4 px-0.5 space-y-3 size-full">
        <Reorder.Group
          className="space-y-2"
          values={tasks.map((t) => t.id)}
          onReorder={(newOrder) => {
            const orderedTasks = newOrder
              .map((id) => tasks.find((task) => task.id === id))
              .filter((task): task is todoType => task !== undefined);

            dispatch(
              changeProject({
                project_id: id,
                change_item: "todo",
                todo: orderedTasks,
              })
            );
          }}>
          <AnimatePresence>
            {tasks.map((task) => (
              <SortableCheckbox
                handleDelete={() => {
                  dispatch(deleteTodo({ project_id: id, todo_id: task.id }));
                }}
                handleChange={(val: string) =>
                  dispatch(
                    changeTodo({ project_id: id, todo_id: task.id, task: val })
                  )
                }
                handleToggle={() => {
                  dispatch(toggleTodo({ project_id: id, todo_id: task.id }));
                }}
                key={task.id}
                addTodo={addTodoItem}
                {...task}
              />
            ))}
          </AnimatePresence>
        </Reorder.Group>
      </div>
    </Card>
  );
}

export default Project;
