import React, {useState}from "react";
import Form from "./components/Nav/Form";
import Profitability from "./components/Nav/Profitability";
import Ratios from "./components/Nav/Ratios";
import Valuation from "./components/Nav/Valuation";
import NavBar from "./components/Nav/NavBar";
import Search from "./components/Nav/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ValueContext } from "./components/Context/ValueContext";


export default function App(){
  const [val, setVal] = useState("RCI")

  return(
    <Router>
    <div className="App">
      <ValueContext.Provider value={{val, setVal}}>
      <NavBar/>

          <Routes>
            {/* <Route path="/"  element={<Search/>}/> */}
            <Route path="/growth" element={<Profitability/>}/>
            <Route path="/understand" element={<Form/>}/>
            <Route path="/ratios" element={<Ratios/>}/>
            <Route path="/valuation" element={<Valuation/>}/>
          </Routes>
        </ValueContext.Provider>
    </div>
    </Router>
  )
}



// import React, {useState}from "react";
// import Form from "./components/Nav/Form";
// import Profitability from "./components/Nav/Profitability";
// import Ratios from "./components/Nav/Ratios";
// import Valuation from "./components/Nav/Valuation";
// import NavBar from "./components/Nav/NavBar";
// import {Search} from "./components/Nav/Search";
// import "./App.css";
// import { ValueContext } from "./components/Context/ValueContext";


// export default function App(){
//   const [val, setVal] = useState("Hello")

//   let component;
//   switch(window.location.pathname){
//     case "/":
//       component =       
//       (<ValueContext.Provider value={{val, setVal}}>
//         <Search/>
//         <Profitability/>

//       </ValueContext.Provider>)
//       break
//     case "/understand":
//       component = <Form/>
//       break
//     // case "/growth":
//     //   component = 
//     //   (<ValueContext.Provider value={{val, setVal}}>
//     //   </ValueContext.Provider>)
//     //   break
//     case "/ratios":
//       component = <Ratios/>
//       break
//     case "/valuation":
//       component = <Valuation/>
//       break
//   }

//   return(
//     <div className="App">
//       <NavBar/>
//       {component}    
//     </div>
//   )
// }