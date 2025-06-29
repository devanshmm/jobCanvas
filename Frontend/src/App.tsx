
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Homepage";
import { ProtectedRout } from "./auth/ProtectedRoute";

export default function App(){
    return (
<div> 
  <Router>
    <Routes>

      <Route path="/signup" element={<Signup />}/>
      <Route path = '/signin' element={<Signin/>}/>
      
      <Route path="/home" element={
        <ProtectedRout>
        <Home/>
        </ProtectedRout>
        }/>
    </Routes>

</Router>
</div>
      );
}