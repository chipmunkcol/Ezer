import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./pages/AddUser";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";
import EditUser from "./pages/EditUser";
import Family from "./pages/family/Family";
import Header from "./components/common/Header";
import FamilyDetail from "./pages/family/FamilyDetail";
import EditFamily from "./pages/family/EditFamily";
import AddFamily from "./pages/family/AddFamily";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* <Route path="/user" element={<Home />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/user/add" element={<AddUser />} />
        <Route path="/user/edit/:id" element={<EditUser />} />
        {/* <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/add/user" element={<AddUser />} />
        <Route path="/edit/user/:id" element={<EditUser />} /> */}

        <Route path="/family" element={<Family />} />
        <Route path="/family/:id" element={<FamilyDetail />} />
        <Route path="/family/add" element={<AddFamily />} />
        <Route path="/family/edit/:id" element={<EditFamily />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
