import React, { useEffect, useState, useContext } from  "react";
import {ValueContext} from "../Context/ValueContext";

export default function Search(){
    //setVal is to update the value by passing current searchInput
    //used useState in App.js in order to make this change
    const {val, setVal} = useContext(ValueContext);
    
    const [searchInput, setSearchInput] = useState("")

    function handleChange(event) {
        setSearchInput(event.target.value)
    }

    //By submitting the api calls and get data and setVal 
    function handleSubmit() {
            setVal(searchInput)
            // window.location.reload();
            document.querySelector('.search--input').value = "";      
    }
    return(
        <div className="search content">
            <input type="search" className="search--input" value={searchInput.val} placeholder="Symbol" onChange={handleChange}/>
            <span type="submit" className="search--button fa fa-search" onClick={handleSubmit}></span>
        </div>        
    )
}

