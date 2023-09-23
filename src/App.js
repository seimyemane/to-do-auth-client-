import Main from "./pages/Main";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./components/Signup";
import TodoUpdate from "./components/TodoUpdate";
import { AuthContextProvider } from "./components/AuthContext";
import ErrorLayout from "./components/ErrorLayout";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route exact path="/" element={<Main />} />

        <Route exact path="home" element={<Home />} />

        <Route exact path="signup" element={<Signup />} />
        <Route exact path="update/:id" element={<TodoUpdate />} />

        <Route exact path="/*" element={<ErrorLayout />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
