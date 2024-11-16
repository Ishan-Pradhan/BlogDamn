import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import ErrorBoundary from "./components/ErrorBoundry";

import LoginPage from "./pages/Auth/LoginPage";

const App = ()=>{
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Home/>}/> 
      <Route path="/Home" element={<Home/>}> </Route>
      <Route path="/CreateBlog" element={<CreateBlog/>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
  
    </Routes>
    </BrowserRouter>
  )
}

export default App;