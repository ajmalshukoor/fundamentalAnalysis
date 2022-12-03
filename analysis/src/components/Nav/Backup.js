import React, {useContext, useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {ValueContext} from "../Context/ValueContext"
import finnhubClient from "../../model";
import {sliceArr} from "../../helper";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

export default function Profitability(){
    //used this context to get input value from search. Complicated!
    const {val} = useContext(ValueContext);

    const [rowData, setRowData] = useState([]);

    useEffect(()=>{
        
        finnhubClient.companyBasicFinancials(val, "margin", (error, data, response) => {
            //while adding a new row:
                //get item from the data.series.annual
                //update reqData
                //update finalData
                //update columnDefs
            const {eps, roe, roa, grossMargin, netMargin} = data.series.annual

            console.log(data.series.annual)
            //create an object only with required data by slicing to first five elements 
            const reqData = {
                Period: eps.slice(0,5).map(el => el.period),
                EPS: sliceArr(eps),
                ROE: sliceArr(roe),
                ROA: sliceArr(roa),
                GrossMargin: sliceArr(grossMargin),
                NetMargin: sliceArr(netMargin),
            }

            //finalized data to pass on to the table after mapping
            const finalData = Object.entries(reqData).map((el,i) => {
                return {
                    Period: reqData.Period[i],
                    EPS: reqData.EPS[i],
                    ROE: reqData.ROE[i],
                    ROA: reqData.ROA[i],
                    GrossMargin: reqData.GrossMargin[i],
                    NetMargin: reqData.NetMargin[i],
                }
            })
            setRowData(finalData)
        });  
    }, [val])

    //Row data key should match the column field:
    const columnDefs=[
        {field: 'Period'},
        {field: 'EPS'},
        {field: 'ROE'},
        {field: 'ROA'},
        {field: 'GrossMargin'},
        {field: 'NetMargin'},
    ];

    const setWidth = columnDefs.length <=7 ? String(columnDefs.length*13)+"%": "100%";
 
    return(
        <div className="grid ag-theme-balham-dark"  style={{width:setWidth}}>
            <h3 className="page-head">PROFITABILITY</h3>
            <AgGridReact
                domLayout='autoHeight'
                rowData={rowData}
                columnDefs={columnDefs}
            />
        </div>
    )
}



import React, {useState}from "react";
import Form from "./components/Nav/Form";
import Profitability from "./components/Nav/Profitability";
import Ratios from "./components/Nav/Ratios";
import Valuation from "./components/Nav/Valuation";
import NavBar from "./components/Nav/NavBar";
import {Search} from "./components/Nav/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ValueContext } from "./components/Context/ValueContext";


export default function App(){
  const [val, setVal] = useState("RCI")


  return(
    <Router>
    <div className="App">
    <NavBar/>
    <div className="content">
      <ValueContext.Provider value={{val, setVal}}>
          <Routes>
            <Route path="/"  element={<Search/>}/>
            <Route path="/growth" element={<Profitability/>}/>
            <Route path="/understand" element={<Form/>}/>
            <Route path="/ratios" element={<Ratios/>}/>
            <Route path="/valuation" element={<Valuation/>}/>
          </Routes>
        </ValueContext.Provider>
    </div>
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



// Profitability---------
// const {val} = useContext(ValueContext);

// const [rowData, setRowData] = useState([]);
// const [balanceSheet, setBalanceSheet] = useState([]);

// useEffect(()=>{
//     //To get some more items like profit.. need to call another api, better not to use async await
//     //since I had to call two api's (which is not good) made another useState to save the data and use that arrayon the 'finalData'
//     fetch(`https://fmpcloud.io/api/v3/income-statement/${val}?limit=220&apikey=${API_KEY}`)
//         .then(res => res.json())
//         .then(data => setBalanceSheet(data.map(el => el.netIncome)))

//     finnhubClient.companyBasicFinancials(val, "margin", (error, data, response) => {
//         //while adding a new row:
//             //get item from the data.series.annual
//             //update reqData
//             //update finalData
//             //update columnDefs
//         const {eps, roe, roa, grossMargin, netMargin} = data.series.annual

//         console.log(data.series.annual)
//         //create an object only with required data by slicing to first five elements 
//         const reqData = {
//             Period: eps.slice(0,5).map(el => el.period),
//             EPS: sliceArr(eps),
//             ROE: sliceArr(roe),
//             ROA: sliceArr(roa),
//             GrossMargin: sliceArr(grossMargin),
//             NetMargin: sliceArr(netMargin),
//         }

//         //finalized data to pass on to the table after mapping
//         const finalData = Object.entries(reqData).map((el,i) => {
//             return {
//                 Period: reqData.Period[i],
//                 PAT: balanceSheet[i] ? (balanceSheet[i])/100000: undefined,
//                 PATMargin: reqData.NetMargin[i] ? (reqData.NetMargin[i]*100).toFixed(2): undefined,
//                 EPS: reqData.EPS[i],
//                 ROE: reqData.ROE[i],
//                 ROA: reqData.ROA[i],
//                 GrossMargin: reqData.GrossMargin[i],
//             }
//         })
//         console.log(finalData)
//         setRowData(finalData)
//     });  
// }, [])