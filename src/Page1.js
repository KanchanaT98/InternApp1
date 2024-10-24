import React, { useEffect,  useState} from "react";
import './Page1.css';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import Form from "./Components/Form";
import axios from "axios";
import SearchBar from "./Components/SearchBar";

function Page1() {
    const [formOpen, setFormOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://customerapi-eqhqhebdhcbwhzd9.canadacentral-01.azurewebsites.net/api/Customers');
                console.log(response.data)
                setRows(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    const handleDeleteRow = async (targetIndex) => {
        const deletedRow = {
            name: rows[targetIndex].name,
            accountNo: rows[targetIndex].accountNo,
            contactNo: rows[targetIndex].contactNo,
            balance: parseFloat(rows[targetIndex].balance) 
        };

        try{
            console.log(deletedRow);
            const response = await axios.delete(`https://customerapi-eqhqhebdhcbwhzd9.canadacentral-01.azurewebsites.net/api/Customers/${rows[targetIndex].id}`);
            console.log(response.data.data);
            alert("Successfully Deleted");
        }catch(error){
            console.error("Error deleting data :",error);
        }
        setRows(rows.filter((_, idx) => idx !== targetIndex));
        
    }

    const handleRowToEdit = (idx) => {
        setRowToEdit(idx);
        setFormOpen(true)
    }

    const handleSubmit = async (newRow) =>{
        const formattedRow = {
            name: newRow.name,
            accountNo: newRow.accountNo,
            contactNo: newRow.contactNo,
            balance: parseFloat(newRow.balance) 
        };
        if(rowToEdit==null){
            try{
                const response = await axios.post('https://customerapi-eqhqhebdhcbwhzd9.canadacentral-01.azurewebsites.net/api/Customers', formattedRow);
                console.log(formattedRow);
                setRows([...rows, formattedRow]);
                alert("Successfully Added")
            }catch(error){
                console.error("error posting data :", error);
            }
        }else{
            //console.log(rows[rowToEdit])
            const updatedRow = { ...rows[rowToEdit], ...formattedRow };
            try{
                console.log(formattedRow)
                await axios.put(`https://customerapi-eqhqhebdhcbwhzd9.canadacentral-01.azurewebsites.net/api/Customers/${rows[rowToEdit].id}`, formattedRow);
                
                        setRows(rows.map((formattedRow, idx) => (
                            idx === rowToEdit ? updatedRow : formattedRow)));
                        alert("Successfully Edited");
                        return updatedRow
                        
            }catch(error){
                console.error("error putting data :", error);
            }
        setFormOpen(false);
        setRowToEdit(null);
        }

        
    };

    return (
      <div className="body">
        <SearchBar/>
        {formOpen && (
            <Form closeForm={() =>{
            setFormOpen(false);
            setRowToEdit(null);
        }}
        onSubmit={handleSubmit}
        defaultValue ={rowToEdit !== null ? rows[rowToEdit] : null}
        />
        )}
        <div className="table">
                <div className="table-header">
                    {/* <div className="header-item">Id</div> */}
                    <div className="header-item">Customer Name</div>
                    <div className="header-item">Account Number</div>
                    <div className="header-item">Telephone Number</div>
                    <div className="header-item">Balance</div>
                    <div className="header-item">Actions</div>
                </div>
                <div className="table-body">
                    {
                        rows.map((row, idx) => (
                            <div className="table-row" key={idx}>
                                {/* <div className="table-item">{row.id}</div> */}
                                <div className="table-item">{row.name}</div>
                                <div className="table-item">{row.accountNo}</div>
                                <div className="table-item">{row.contactNo}</div>
                                <div className="table-item">{row.balance}</div>
                                <div className="table-item">
                                    <span className="action">
                                        <BsFillTrashFill className="delete-btn" onClick={() => handleDeleteRow(idx)} />
                                        <BsFillPencilFill className="edit-btn" onClick={() => handleRowToEdit(idx)} />
                                    </span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        <div><button className="add-btn" onClick={() => setFormOpen(true)}>Add</button></div>
      </div>
    )
  }
  export default Page1