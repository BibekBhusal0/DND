export type coors = { x: number; y: number; w: number; h: number };
export type sizeType = { x: number; y: number };

export type WidgetType = {
  id: number;
  position: coors;
};

export type WidgetComponentProps = {
  id: number;
  children: React.ReactNode;
  position?: coors;
};

export type layoutType = WidgetType[];

export type layoutStateType = {
  grid: sizeType;
  max_id: number;
  layout: layoutType;
};
