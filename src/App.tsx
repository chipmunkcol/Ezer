import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./pages/AddUser";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/add/user" element={<AddUser />} />
        <Route path="/edit/user/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
