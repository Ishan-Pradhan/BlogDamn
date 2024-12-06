import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";

import LoginPage from "./pages/Auth/LoginPage";
import SingleBlog from "./pages/SingleBlog";
import SignupPage from "./pages/Auth/SignupPage";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/Home" element={<Home />}>
          {" "}
        </Route>
        <Route path="/CreateBlog" element={<CreateBlog />}></Route>
        <Route path="/SingleBlog" element={<SingleBlog />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
