import Project from "./components/todo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { addProject } from "./redux/todoSlice";
import { Card, CardActions } from "@mui/material";

function App() {
  const { projects } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();
  return (
    <>
      <div className="p-3">
        <div className="grid grid-cols-2 gap-3 h-full overflow-auto">
          {projects.map((project) => (
            <Project key={project.id} {...project} />
          ))}
          <Card
            onClick={() => {
              dispatch(addProject({ title: "" }));
            }}
            className="border-2 border-green-600 group flex-center h-80 cursor-pointer">
            <CardActions>
              <AddCircleOutlineRoundedIcon className="text-9xl scale-110 transition-all group-hover:scale-150 cursor-pointer" />
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
