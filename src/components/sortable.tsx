import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string | number;
  children: React.ReactNode;
  divProps?: React.HTMLProps<HTMLDivElement>;
}

export function SortableItem({
  id,
  children,
  divProps = {},
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...divProps}
      style={style}
      {...attributes}
      {...listeners}>
      {children}
    </div>
  );
}
