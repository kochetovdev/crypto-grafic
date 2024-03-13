import "./App.css";
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";
import Settings from "../Settings";
import Content from "../Shared/Content";

function App() {
  return (
    <AppLayout>
      <AppBar />
      <Content>
        <Settings />
      </Content>
    </AppLayout>
  );
}

export default App;
