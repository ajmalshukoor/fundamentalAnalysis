import React, {useState, useEffect} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

export default function Table(props){
    const {apiData, reqData, colData, pageName} = props
    const [k, setK] = useState("");

    const [filterInput, setFilterInput] = useState("");
    //for add param input to show and hide
    const [addClicked, setAddClicked] = useState(false);
    //for remove param input to show and hide
    const [removeClicked, setRemoveClicked] = useState(false);
    //stores columns for AgGrid
    const [columnDefs, setColumnDefs] = useState(colData);
    //stores rows for AgGrid
    const [rowData, setRowData] = useState(reqData.length>0 ? reqData : []);

    const objKeys = Object.keys(k).map(el => {
        if(filterInput != ""){
            if(el.toUpperCase().indexOf(filterInput.toUpperCase()) > -1){
                return el;
            }
        }
    }).filter(v => v !== undefined).slice(0,6)

    useEffect(()=>{
        Object.keys(apiData[0]).forEach(key => {
            setK(prevData => {
                return {
                    ...prevData,
                    [key.charAt(0).toUpperCase()+key.substring(1)]: key
                }
            })
        })
    }, [])

    function handleAddClick(){
        setAddClicked(!addClicked);
    }
    function handleRemoveClick(){
        setRemoveClicked(!removeClicked);
    }

    //when filtered parms clicked
    function handleLink(event){
        const linkVal = event.target.textContent
        const validator = columnDefs.map(el=>el['field'].indexOf(linkVal));
        setFilterInput("");

        if(addClicked){
            //check if the columns have the key already, if not proceed
            if(!validator.includes(0)){
                //rowData changes thus the table changes
                setRowData(prevData => {
                    return prevData.map((el,i) => {
                        const value = apiData[i][k[linkVal]]
                        return {
                            ...el,
                            [linkVal]: typeof value === "number"? value.toFixed(2): value,
                        }
                    })
                })
                //column changes thus the table changes
                setColumnDefs(prevData => {
                    return [...prevData, {field: linkVal}]
                }) 
            }
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
            <h3 className="page-head">{pageName}</h3>
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
                    objKeys.map(v => {
                        return <li onClick={handleLink}>{v}</li>
                    })
                }
            </ul>
        </div>
    )
}