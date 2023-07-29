import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


import Home from "./Pages/Home/index";
import ClientsPage from "./Pages/ClentsHome";


function App() {


      


  return (
 
     <Router>

        <Routes>
          <Route path="/" element={ <Home />} exact />

          <Route  path="/home" element={<ClientsPage />} />

          {/* <Route path="/home" element={<UserPage />} /> */}

        </Routes>

     </Router>



  )
}

export default App;
