import React, { useEffect, useState } from  "react";
import Fieldset from "./Fieldset";
import data from "../../data";

export default function Form(){

    //to pass data to the form including lable, input and comments
    const [formData, setFormData] = useState(()=>{
        //recall data stored in localstorage after refresh
        const saved = localStorage.getItem("dataKey")
        const initialValue = JSON.parse(saved)
        //if data present it will call the data otherwise return the default data
        return initialValue || data;
    })

    function handleClick(){
        setFormData(data);
    }
    // const [localData, setLocalData] = useState(()=>{
    //     //recall data stored in localstorage after refresh
    //     const saved = localStorage.getItem("dataKey")
    //     const initialValue = JSON.parse(saved)
    //     //if data present it will call the data otherwise return the default data
    //     return initialValue || null;
    // })

    //storing data in local storage
    useEffect(()=>{
        localStorage.setItem('dataKey', JSON.stringify(formData))
    },[formData]);

    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c84a7ec3c1msh3fb01b446d658a9p1c3743jsn5f75c3e2b57d',
                'X-RapidAPI-Host': 'ms-finance.p.rapidapi.com'
            }
        };
        
        fetch('https://ms-finance.p.rapidapi.com/market/v2/auto-complete?q=tesla', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }, [])

    //handle change when input and comment changes
    function handleChange(event){
        const {name, type, checked, value} = event.target
        setFormData(prevFormData => {
            return(
                {
                    //calling all the previous formData and replacing changed items
                    ...prevFormData,
                    [name]: type === "checkbox" ? checked : value 
                }
            )
        })
        //to keep the check box checked after reload
        if(checked===true){
            event.target.checked = true
        }
    }
    function handleSubmit(event){
        event.preventDefault()
        

    }
    //the fieldset is in the router to avoid error because of the outside routing
    return(
        <form className="checkList" onSubmit={handleSubmit}>
            <Fieldset formData={formData} handleClick={handleClick} handleChange={handleChange}/>
        </form>
    )
}