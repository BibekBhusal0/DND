import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card, CardHeader, CheckBox } from "grommet";
import { RxDragHandleDots2 } from "react-icons/rx";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "../lib/utils";
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
import { HiTrash } from "react-icons/hi2";
import { LuPlusCircle } from "react-icons/lu";
import { useEffect, useRef } from "react";

export const transparentInput =
  "border-transparent w-full bg-transparent resize-none focus:outline-none";

function Project({ id, title, tasks }: projectType) {
  const dispatch = useDispatch();

  const getTaskPosition = (id: number) => {
    return tasks.findIndex((task) => task.id === id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;
    const oldPos = getTaskPosition(active.id as number);
    const newPos = getTaskPosition(over.id as number);
    const newTodo = arrayMove(tasks, oldPos, newPos);
    dispatch(
      changeProject({ project_id: id, change_item: "todo", todo: newTodo })
    );
  };

  const addTodoItem = () => {
    dispatch(addTodo({ project_id: id, task: "" }));
  };
  const deleteThis = () => {
    dispatch(deleteProject(id));
  };
  return (
    <Card className="border-2 h-80 border-green-600 p-3">
      <CardHeader justify="between">
        {/* <Text size="large">{title}</Text> */}
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
          className={cn(transparentInput, "text-3xl")}
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
          <HiTrash className="text-2xl cursor-pointer" onClick={deleteThis} />

          <LuPlusCircle
            className="text-2xl cursor-pointer"
            onClick={addTodoItem}
          />
        </div>
      </CardHeader>
      <div className="overflow-auto scroll-container py-4 px-0.5 space-y-3 size-full">
        <DndContext
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          //
        >
          <SortableContext strategy={verticalListSortingStrategy} items={tasks}>
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
          </SortableContext>
        </DndContext>
      </div>
    </Card>
  );
}

export type sortableCheckboxProps = todoType & {
  handleChange: (val: string) => void;
  handleDelete: () => void;
  handleToggle: () => void;
  addTodo?: () => void;
};

export function SortableCheckbox({
  id,
  task,
  checked,
  handleDelete,
  handleChange,
  handleToggle,
  addTodo = () => {},
}: sortableCheckboxProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isDragging && textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height
    }
  }, [task, isDragging]);

  return (
    <div
      className={cn("flex align-top gap-1 group/todo items-start")}
      ref={setNodeRef}
      style={{ ...style }}
      //
    >
      <div className=" w-6 h-full">
        <RxDragHandleDots2
          className={cn(
            "text-2xl opacity-45 cursor-grab focus:cursor-grabbing",
            "hidden group-hover/todo:block  hover:block"
          )}
          {...attributes}
          {...listeners}
        />
      </div>
      <CheckBox checked={checked} onChange={handleToggle} />
      <textarea
        ref={textareaRef}
        placeholder="New Todo"
        value={task}
        autoFocus={task.trim() === ""}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTodo();
          } else if (e.key === "Backspace" && task.trim() === "") {
            handleDelete();
          }
        }}
        className={cn(transparentInput, "group/input")}
        rows={1}
      />
      <div className="w-6 h-full">
        <HiTrash
          className="text-xl hidden group-hover/todo:block cursor-pointer"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}

export default Project;
