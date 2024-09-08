import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box, Button, CheckBox, Text, TextInput } from "grommet";
import { useState } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "../lib/utils";

function Todo() {
  const [value, setValue] = useState([
    { id: 1, name: "First" },
    { id: 2, name: "Second" },
    { id: 3, name: "Third" },
  ]);
  const [maxId, setMaxId] = useState(3);
  const [inp, setInp] = useState("");

  const addTask = (name: string) => {
    setValue((tasks) => {
      const newTask = { id: maxId + 1, name };
      setMaxId(maxId + 1);
      return [...tasks, newTask];
    });
  };

  const getTaskPosition = (id: number) => {
    return value.findIndex((task) => task.id === id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;
    setValue((tasks) => {
      const oldPos = getTaskPosition(active.id as number);
      const newPos = getTaskPosition(over.id as number);

      return arrayMove(tasks, oldPos, newPos);
    });
  };
  return (
    <>
      <Box direction="column" gap="small">
        <Text size="large">Todo</Text>
        <Box direction="column" className="pl-5 gap-2">
          <DndContext
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            //
          >
            <SortableContext
              strategy={verticalListSortingStrategy}
              items={value}>
              {value.map((task) => (
                <SortableCheckbox key={task.id} {...task} />
              ))}
            </SortableContext>
          </DndContext>
          <Box direction="row" gap="large">
            <TextInput
              value={inp}
              onChange={(e) => setInp(e.target.value)}
              placeholder="Add Task"
            />
            <Button
              label="Add Task"
              onClick={() => {
                addTask(inp);
                setInp("");
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export function SortableCheckbox({
  id,
  name,
}: {
  id: number | string;
  name: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <Box
      direction="row"
      className={cn("gap-2 transition-all")}
      ref={setNodeRef}
      style={{ ...style }}
      //
    >
      <CheckBox />
      <RxDragHandleDots2
        className="text-2xl cursor-grab focus:cursor-grabbing"
        {...attributes}
        {...listeners}
      />
      <Text>{name}</Text>
    </Box>
  );
}

export default Todo;
