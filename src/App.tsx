import "./App.css";
import { Button, Grommet, ThemeType } from "grommet";
import { useCurrentTheme } from "./hooks/use-current-theme";
import Todo from "./components/todo";

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
  return (
    <>
      <Grommet full className="p-3" theme={theme}>
        <div>
          <h1>Heading </h1>
          <Button label="Button" />
          <Todo />
        </div>
      </Grommet>
    </>
  );
}

export default App;
