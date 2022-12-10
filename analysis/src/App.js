import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ValueContext } from "./components/Context/Context";
import { API_KEY } from "./token";
import Form from "./components/Form/Form";
import Profitability from "./components/Ratios/Profitability";
import Valuation from "./components/Ratios/Valuation";
import Operational from "./components/Ratios/Operational";
import NavBar from "./components/Nav/NavBar";
import Leverage from "./components/Ratios/Leverage";
import "./App.css";


export default function App(){
  const [val, setVal] = useState("RCI");
  const [apiData, setApiData] = useState([]);
  const [callBack, setCallBack] = useState(false);

  useEffect(()=>{
      fetch(`https://fmpcloud.io/api/v3/income-statement/${val}?limit=40&apikey=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        fetch(`https://fmpcloud.io/api/v3/ratios/${val}?limit=40&apikey=${API_KEY}`)
        .then(diffRes => diffRes.json())
        .then(diffData => {
          console.log(data)
          const arr = data.map((el,i) => {
            return {
              ...el,
              ...diffData[i]
            }
          })
          setApiData(arr)
          setCallBack(true);
        })
        });
        setInterval(setCallBack(false), 1000)
  }, [val])

  if(callBack) {
  return(
    <Router>
    <div className="App">
      {/* <ValueContext.Provider value={{val, setVal}}> */}
      <ValueContext.Provider value={{val, setVal}}>
        <NavBar/>
        <Routes>
          <Route path="/"  exact element={<Form/>}/>
          <Route path="/operational"  exact element={<Operational apiData={apiData}/>}/>
          <Route path="/valuation" element={<Valuation apiData={apiData}/>}/>
          <Route path="/profitability" element={<Profitability apiData={apiData}/>}/>
          <Route path="/leverage" element={<Leverage apiData={apiData}/>}/>
          {/* <Route path="/" element={<Profitability/>}/>
          <Route path="/valuation" element={<Valuation/>}/> */}
        </Routes>
      </ValueContext.Provider>
    </div>
    </Router>
  )
        }
}
