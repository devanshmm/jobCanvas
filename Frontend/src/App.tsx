
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/app/Signup";

export default function App(){
    return (
<div> 
  <Router>
    <Routes>

      <Route path="/signup" element={<Signup />}/>
    </Routes>

</Router>
</div>
      );
}