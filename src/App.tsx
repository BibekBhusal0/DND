import "./App.css";
import { Card, Grommet, ThemeType } from "grommet";
import { useCurrentTheme } from "./hooks/use-current-theme";
import Project from "./components/todo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { LuPlusCircle } from "react-icons/lu";
import { addProject } from "./redux/todoSlice";

function App() {
  const colors = useCurrentTheme();
  const theme: ThemeType = {
    global: {
      colors: { ...colors },
      font: {
        family: "Roboto",
      },
    },
  };

  const { projects } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();
  return (
    <>
      <Grommet full className="p-3" theme={theme}>
        <div className="grid grid-cols-2 gap-3 h-full overflow-auto">
          {projects.map((project) => (
            <Project key={project.id} {...project} />
          ))}
          <Card
            onClick={() => {
              dispatch(addProject({ title: "" }));
            }}
            className="border-2 border-green-600 group flex-center h-80">
            <LuPlusCircle className="text-9xl scale-110 transition-all group-hover:scale-150  cursor-pointer" />
          </Card>
        </div>
      </Grommet>
    </>
  );
}

export default App;
