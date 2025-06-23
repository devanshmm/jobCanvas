
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

export default function App(){
    return (
<div> 
  <Router>
    <Routes>

      <Route path="/signup" element={<Signup />}/>
      <Route path = '/signin' element={<Signin/>}/>
    </Routes>

</Router>
</div>
      );
}