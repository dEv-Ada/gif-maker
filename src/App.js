import "./App.css";
import "./responsive.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/auth/login";
import Header from "./components/header/header";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Dashboard />
        </>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div className="App" id="root">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
