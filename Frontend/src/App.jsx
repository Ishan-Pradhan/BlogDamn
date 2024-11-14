import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import ErrorBoundary from "./components/ErrorBoundry";

const App = ()=>{
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Home/>}/> 
      <Route path="/Home" element={<Home/>}> </Route>
      <Route path="/CreateBlog" element={<CreateBlog/>}></Route>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App;