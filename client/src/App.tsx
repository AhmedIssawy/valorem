import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SettingsProvider } from "./contexts/SettingsContext";

function App() {
  return (
    <SettingsProvider>
      <Outlet />
      <ToastContainer />
    </SettingsProvider>
  );
}

export default App;
