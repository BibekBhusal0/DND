import { CheckBox } from "grommet";
import { RxDragHandleDots2 } from "react-icons/rx";
import { sortableCheckboxProps } from "../types/todo";
import { HiTrash } from "react-icons/hi2";
import { useEffect, useRef } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { transparentInput } from "./todo";

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
      className="flex align-top group/todo items-start gap-2"
      //
    >
      <div className="w-8 h-full">
        <RxDragHandleDots2
          onPointerDown={(e) => {
            e.preventDefault();
            controls.start(e);
          }}
          className="text-2xl opacity-45 cursor-grab focus:cursor-grabbing hidden group-hover/todo:block  hover:block m-0 p-0"
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
        className={`${transparentInput} text-lg`}
        rows={1}
      />
      <div className="w-6 h-full">
        <HiTrash
          className="text-xl hidden group-hover/todo:block cursor-pointer"
          onClick={handleDelete}
        />
      </div>
    </Reorder.Item>
  );
}
export default SortableCheckbox;
