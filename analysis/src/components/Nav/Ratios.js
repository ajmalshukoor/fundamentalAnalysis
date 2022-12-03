import React, {useContext, useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {ValueContext} from "../Context/ValueContext"
import {API_KEY} from "../../token"
import {profitKeys} from "../../helper";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

export default function Ratios(){
    const [fullData, setFullData] = useState([]);
    const [filterInput, setFilterInput] = useState("");
    //used this context to get input value from search. Complicated!
    const {val} = useContext(ValueContext);
    //for add param input to show and hide
    const [addClicked, setAddClicked] = useState(false);
    //for remove param input to show and hide
    const [removeClicked, setRemoveClicked] = useState(false);
    //stores columns for AgGrid
    const [columnDefs, setColumnDefs] = useState([
        {field: 'Date'},
        {field: 'Revenue'},
        {field: 'EPS'},
        {field: 'GrossMargin'},
        {field: 'PATMargin'},
    ]);
    //stores rows for AgGrid
    const [rowData, setRowData] = useState([]);

    function handleAddClick(){
        setAddClicked(!addClicked);
    }
    function handleRemoveClick(){
        setRemoveClicked(!removeClicked);
    }

    //when filtered parms clicked
    function handleLink(event){
        const linkVal = event.target.textContent
        setFilterInput("");
        if(addClicked){
            //rowData changes thus the table changes
            setRowData(prevData => {
                return prevData.map((el,i) => {
                    const value = fullData[i][profitKeys[linkVal]]
                    return {
                        ...el,
                        [linkVal]: typeof value === "number"? value.toFixed(2): value,
                    }
                })
            })
            //column changes thus the table changes
// ----------------------------------------------------------------------------------------------------------------------------------------
            setColumnDefs(prevData => {
                return prevData.map(el => {
                    if(el['field'] == linkVal){
                        return [...prevData]
                    }
                    if(el['field'] != linkVal){
                        return [...prevData,  {field: linkVal}]
                    }
                })
                // return [...prevData, {field: linkVal}]
            })
        }
        if(removeClicked){
            //column changes thus the table changes
            setColumnDefs(prevData => {
                //filter items filed is not equal to clicked
                return prevData.filter(el => el["field"] != linkVal);
            })
        }
    }

    function handleChange(event) {
        setFilterInput(event.target.value)
    }

    //calls two apis for both incomestatement and ratios, chained
    useEffect(()=>{
        fetch(`https://fmpcloud.io/api/v3/income-statement/${val}?limit=40&apikey=${API_KEY}`)
        .then(res1 => res1.json())
        .then(data1 => {
            fetch(`https://fmpcloud.io/api/v3/ratios/${val}?limit=40&apikey=${API_KEY}`)
            .then(res2 => res2.json())
            .then(data2 => {
                const reqData = data2.map((el, i) => {
                    return{
                        Date: el.date,
                        Revenue: data1[i].revenue/1000000+" M",
                        EPS: data1[i].eps.toFixed(2),
                        GrossMargin: el.grossProfitMargin.toFixed(2),
                        PATMargin: el.netProfitMargin.toFixed(2),
                    }
                })
                setFullData(data2);
                setRowData(reqData);
            })
        });

    }, [val])

    //related to AgGrid
    const  defaultColDef = {
        flex: 1,
        minWidth: 100,
        sortable: true,
        filter: true,
      }
    const setWidth = columnDefs.length <=7 ? String(columnDefs.length*13)+"%": "95%";

    return(
        <div className="grid ag-theme-balham-dark"  style={{width:setWidth}}>
            <h3 className="page-head">Ratios</h3>
            <div className="tableBtns">
                <button className="add" onClick={handleAddClick} disabled={removeClicked}>Add Param</button>
                <button className="add" onClick={handleRemoveClick} disabled={addClicked}>Remove Param</button>
            </div>
            <AgGridReact
                domLayout='autoHeight'
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            />
            <input type="text" placeholder="type keyword.." className={addClicked ? "filter": "hide"} value={filterInput} onChange={handleChange}></input>
            <input type="text" placeholder="type keyword.." className={removeClicked ? "filter": "hide"} value={filterInput} onChange={handleChange}></input>
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