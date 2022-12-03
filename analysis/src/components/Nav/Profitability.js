import React, {useContext, useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {ValueContext} from "../Context/ValueContext"
import {API_KEY} from "../../token"
import {profitKeys} from "../../helper";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

export default function Profitability(){
    //used this context to get input value from search. Complicated!
    const {val} = useContext(ValueContext);
    const [clicked, setClicked] = useState(false);
    const [fullData, setFullData] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [filterInput, setFilterInput] = useState("");

    function handleClick(){
        setClicked(!clicked);
    }

    function handleLink(event){
        const linkVal = event.target.textContent
        setFilterInput("");
        console.log(profitKeys[linkVal])
    }

    function handleChange(event) {
        setFilterInput(event.target.value)
    }

    useEffect(()=>{
        fetch(`https://fmpcloud.io/api/v3/income-statement/${val}?limit=40&apikey=${API_KEY}`)
        .then(res1 => res1.json())
        .then(data1 => {
            fetch(`https://fmpcloud.io/api/v3/ratios/${val}?limit=40&apikey=${API_KEY}`)
            .then(res2 => res2.json())
            .then(data2 => {
                console.log(data2)
                const reqData = data2.map((el, i) => {
                    return{
                        Date: el.date,
                        Revenue: data1[i].revenue/1000000+" M",
                        EPS: data1[i].eps.toFixed(2),
                        GrossMargin: el.grossProfitMargin.toFixed(2),
                        PATMargin: el.netProfitMargin.toFixed(2),
                        ROE: el.returnOnEquity.toFixed(2),
                        ROA: el.returnOnAssets.toFixed(2),
                        ROCE: el.returnOnCapitalEmployed.toFixed(2),
                        EbtPerEbit: el.ebtPerEbit.toFixed(2)
                    }
                })
                setRowData(reqData)
            })
        });

    }, [val])

    //Row data key should match the column field:
    const columnDefs=[
        {field: 'Date'},
        {field: 'Revenue'},
        {field: 'EPS'},
        {field: 'GrossMargin'},
        {field: 'PATMargin'},
        {field: 'ROE'},
        {field: 'ROA'},
        {field: 'ROCE'},
        {field: 'EbtPerEbit'},
    ];

    const  defaultColDef = {
        flex: 1,
        minWidth: 100,
        sortable: true,
        filter: true,
      }
    const setWidth = columnDefs.length <=7 ? String(columnDefs.length*13)+"%": "95%";
 
    return(
        <div className="grid ag-theme-balham-dark"  style={{width:setWidth}}>
            <h3 className="page-head">Profitability</h3>
            <button className="add" onClick={handleClick}>Add Param</button>
            <AgGridReact
                domLayout='autoHeight'
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            />
            <input type="text" placeholder="Search keywords.." className={clicked ? "filter": "hide"} value={filterInput} onChange={handleChange}></input>
            <ul id="myUL">
                {
                    Object.keys(profitKeys).map(el => {
                        if(filterInput != ""){
                            if(el.toUpperCase().indexOf(filterInput.toUpperCase()) > -1){
                                return <li onClick={handleLink}>{el}</li>
                            }
                        }
                    })
                }
            </ul>
        </div>
    )
}