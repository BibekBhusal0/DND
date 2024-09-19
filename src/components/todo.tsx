import { projectType, todoType } from "../types/todo";
import { useDispatch } from "react-redux";
import {
  changeProject,
  deleteTodo,
  changeTodo,
  toggleTodo,
  deleteProject,
  addTodo,
  toggleSortedFiltered,
} from "../redux/todoSlice";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { AnimatePresence, Reorder } from "framer-motion";
import SortableCheckbox from "./checkbox";
import { Box, IconButton } from "@mui/material";
import TodoMenu from "./todo-menu";
import { useRef } from "react";

export const transparentInput =
  "border-transparent w-full bg-transparent resize-none focus:outline-none";

function Project({ id, title, tasks, filtered, sorted }: projectType) {
  const dispatch = useDispatch();
  const taskRefs = useRef<Map<number, HTMLTextAreaElement | null>>(new Map());
  const titleRef = useRef<HTMLInputElement>(null);
  var dynamicTasks = [...tasks];

  if (filtered) {
    dynamicTasks = tasks.filter((t) => !t.checked);
  } else if (sorted) {
    dynamicTasks = [
      ...tasks.filter((t) => !t.checked),
      ...tasks.filter((t) => t.checked),
    ];
  }

  const focusPrevious = (currentTodoId: number) => {
    const currentIndex = dynamicTasks.findIndex(
      (task) => task.id === currentTodoId
    );
    const previousIndex = currentIndex - 1;

    var focusOn: HTMLTextAreaElement | HTMLInputElement | null | undefined =
      null;
    if (previousIndex >= 0) {
      const previousTaskId = dynamicTasks[previousIndex].id;
      focusOn = taskRefs.current.get(previousTaskId);
    } else {
      focusOn = titleRef.current;
    }
    // setTimeout(() => {
    focusOn?.focus();
    // }, 100);
  };

  const focusNext = (currentTodoId: number) => {
    const currentIndex = dynamicTasks.findIndex(
      (task) => task.id === currentTodoId
    );
    const nextIndex = currentIndex + 1;

    if (nextIndex < dynamicTasks.length) {
      const nextTaskId = dynamicTasks[nextIndex].id;
      const nextElement = taskRefs.current.get(nextTaskId);
      nextElement?.focus();
    }
  };
  const addTodoItem = () => {
    dispatch(addTodo({ project_id: id, task: "" }));
  };
  const deleteThis = () => {
    dispatch(deleteProject(id));
  };
  return (
    <Box
      sx={{ bgcolor: "primary[500]" }}
      className="h-80 border-2 border-white overflow-hidden p-4 rounded-md">
      <div className="flex justify-between items-center gap-2 px-3">
        <input
          ref={titleRef}
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
          <IconButton onClick={addTodoItem}>
            <AddCircleOutlineRoundedIcon />
          </IconButton>
          <TodoMenu
            filtered={filtered}
            sorted={sorted}
            handleDelete={deleteThis}
            handleFilter={() => {
              dispatch(toggleSortedFiltered({ id, type: "filtered" }));
            }}
            handleSort={() =>
              dispatch(toggleSortedFiltered({ id, type: "sorted" }))
            }
          />
        </div>
      </div>
      <div className="overflow-scroll scroll-container py-4 px-0.5 space-y-3 size-full">
        <Reorder.Group
          className="space-y-2"
          values={dynamicTasks.map((t) => t.id)}
          onReorder={(newOrder) => {
            const orderedTasks = newOrder
              .map((id) => dynamicTasks.find((task) => task.id === id))
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
            {dynamicTasks.map((task) => (
              <SortableCheckbox
                ref_={(el: HTMLTextAreaElement | null) =>
                  taskRefs.current.set(task.id, el)
                }
                handleDelete={() => {
                  dispatch(deleteTodo({ project_id: id, todo_id: task.id }));
                }}
                focusPrevious={() => focusPrevious(task.id)}
                focusNext={() => focusNext(task.id)}
                handleChange={(val: string) =>
                  dispatch(
                    changeTodo({
                      project_id: id,
                      todo_id: task.id,
                      task: val,
                    })
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
    </Box>
  );
}

export default Project;
