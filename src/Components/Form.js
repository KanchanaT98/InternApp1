import React from "react";
import "./Form.css"
import { useState } from "react";

function Form({ closeForm, onSubmit, defaultValue }) {

    const[formState, setFormState] = useState(
        defaultValue || {
        // id: "",
        name: "",
        accountNo: "",
        contactNo: "",
        balance: ""
    });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validateForm()) return;

        onSubmit(formState);
        closeForm();
    };

    const validateForm = () => {
        if(/*formState.id &&*/ formState.name && formState.accountNo &&
            formState.contactNo && formState.balance){
            return true
        }else{
            return false
        }
    }


    return(
         <div className="Form-container" onClick={(e) => {
            if (e.target.className ==="Form-container") closeForm();}
            }>
            <div className="Form">
                <form>
                    {/* <div className="input-group">
                        <label htmlFor="customer-id">Customer Id</label>
                        <input name="id" value={formState.customerId} onChange={handleChange}/>
                    </div> */}
                    <div className="input-group">
                        <label htmlFor="customer-name">Customer Name</label>
                        <input name="name" value={formState.name} onChange={handleChange}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="account-number">Account Number</label>
                        <input name="accountNo" value={formState.accountNo} onChange={handleChange}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="telephone-number">Telephone Number</label>
                        <input name="contactNo" value={formState.contactNo} onChange={handleChange}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="balance">Balance</label>
                        <input name="balance" value={formState.balance} onChange={handleChange}/>
                    </div>
                    <div>
                        <button className="btn" type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
} 
export default Form;