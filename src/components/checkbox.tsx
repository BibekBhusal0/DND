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
}: sortableCheckboxProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const controls = useDragControls();
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height
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
      className="flex align-center group items-center justify-center gap-2 "
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
