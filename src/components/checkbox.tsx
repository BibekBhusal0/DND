import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { sortableCheckboxProps } from "../types/todo";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useRef } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { transparentInput } from "./todo";
import Checkbox from "@mui/material/Checkbox";

function SortableCheckbox({
  id,
  task,
  checked,
  handleDelete,
  handleChange,
  handleToggle,
  addTodo = () => {},
  ref_ = () => ({}),
  focusPrevious = () => {},
  focusNext = () => {},
}: sortableCheckboxProps) {
  const controls = useDragControls();

  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref_ && ref.current) {
      ref_(ref.current);
    }
  }, [ref_, ref]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto"; // Reset height
      ref.current.style.height = `${ref.current.scrollHeight}px`; // Adjust height
    }
  }, [task]);

  return (
    <Reorder.Item
      value={id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ ease: "easeInOut" }}
      dragControls={controls}
      dragListener={false}
      className="flex align-center group items-start justify-center gap-2 "
      //
    >
      <div className="w-8 h-full">
        <div
          onPointerDown={(e) => {
            e.preventDefault();
            controls.start(e);
          }}
          className="opacity-45 cursor-grab focus:cursor-grabbing hidden group-hover:block m-0 p-0">
          <DragIndicatorIcon />
        </div>
      </div>
      <Checkbox checked={checked} sx={{ padding: 0 }} onChange={handleToggle} />
      <textarea
        ref={ref}
        placeholder="New Todo"
        value={task}
        autoFocus={task.trim() === ""}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Backspace" && task.trim() === "") {
            e.preventDefault();
            handleDelete();
            setTimeout(() => {
              focusPrevious();
            }, 100);
          } else if (["ArrowUp", "Enter", "ArrowDown"].includes(e.key)) {
            e.preventDefault();
            if (e.key === "Enter") {
              addTodo();
            } else if (e.key === "ArrowUp") {
              focusPrevious();
            } else if (e.key === "ArrowDown") {
              focusNext();
            }
          }
        }}
        className={`${transparentInput} text-lg`}
        rows={1}
      />
      <div className="w-8 h-full">
        <button
          className="rounded-full cursor-pointer h-full hidden group-hover:block"
          onClick={handleDelete}
          //    s
        >
          <DeleteIcon />
        </button>
      </div>
    </Reorder.Item>
  );
}

export default SortableCheckbox;
