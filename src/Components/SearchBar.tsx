import React from "react";
import "./SearchBar.css"
import { useState } from "react";
import axios from "axios";

interface Customer {
    id?: number;
    name: string;
    accountNo: string;
    contactNo: string;
    balance: number;
}

function SearchBar(){

    const [searchText, setSearchText] = useState<string>("");
    
    const fetchData = async (value: string) => {
        try{
            if(value !== ""){
                console.log(value)
                const id: number = parseFloat(value);
                const response = await axios.get<{data: Customer}>(`https://customerapi-eqhqhebdhcbwhzd9.canadacentral-01.azurewebsites.net/api/Customers/${value}`);
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