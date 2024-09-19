import Project from "./components/todo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { addProject } from "./redux/todoSlice";
import { Card, CardContent } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { projects } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="p-3">
        <div className="grid grid-cols-2 gap-3 h-full">
          {projects.map((project) => (
            <Project key={project.id} {...project} />
          ))}
          <Card
            variant="elevation"
            elevation={3}
            className="group flex-center h-80 cursor-pointer"
            onClick={() => {
              dispatch(addProject({ title: "" }));
            }}>
            <CardContent className="scale-[3] transition-all group-hover:scale-[6]">
              <AddCircleOutlineRoundedIcon />
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
