import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/index";

function App() {
  return (
 
     <Router>

        <Routes>
          <Route path="/" element={ <Home />} exact />
        </Routes>

     </Router>



  )
}

export default App;
