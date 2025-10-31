import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./pages/AddUser";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";
import EditUser from "./pages/EditUser";
import Family from "./pages/family/Family";
import Header from "./components/common/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/add/user" element={<AddUser />} />
        <Route path="/edit/user/:id" element={<EditUser />} />

        <Route path="family" element={<Family />}>
          <Route path=":familyId" element={<div></div>} />
          <Route path="add" element={<div></div>} />
          <Route path="edit/:familyId" element={<div></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
