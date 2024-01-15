import LeftMenu from "./components/LeftMenu";
import RightTaskDesc from "./components/RightTaskDesc";
import Task from "./components/Task";

function App() {
  return (
    <main className="App">
      <LeftMenu/>
      <Task/>
      <RightTaskDesc/>
    </main>
  );
}

export default App;
