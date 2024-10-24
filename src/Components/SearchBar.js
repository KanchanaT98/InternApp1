import React from "react";
import "./SearchBar.css"
import { useState } from "react";
import axios from "axios";

function SearchBar(){

    const [searchText, setSearchText] = useState("");
    
    const fetchData = async (value) => {
        try{
            if(value !== ""){
                console.log(value)
                const id = parseFloat(value);
                const response = await axios.get(`https://customerapi-eqhqhebdhcbwhzd9.canadacentral-01.azurewebsites.net/api/Customers/${value}`);
                console.log(response)
                setSearchText("")
                return response;
            }
        }catch(error){
            console.error("Error Fetching Data :", error)
        }
    }

    const handleSearch = () => {
        fetchData(searchText);
    };

    return(
        <div className="container">
                <div className="search-input">
                    <input id="searchText" value={searchText}
                    type="text"
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="   Search Here"></input>
                    <button className ="searchBtn" type="submit" onClick={handleSearch}>Search</button>
                </div>
        </div>
    )
}
export default SearchBar;