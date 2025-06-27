
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Homepage";

export default function App(){
    return (
<div> 
  <Router>
    <Routes>

      <Route path="/signup" element={<Signup />}/>
      <Route path = '/signin' element={<Signin/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>

</Router>
</div>
      );
}