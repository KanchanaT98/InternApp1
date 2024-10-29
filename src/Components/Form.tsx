import  React, { FormEvent, useState } from "react";
import "./Form.css"

    interface FormProps {
    closeForm: () => void;
    onSubmit: (formState: FormState) => void;
    defaultValue?: FormState | null;
    }
  
  interface FormState {
    id?: number;
    name: string;
    accountNo: string;
    contactNo: string;
    balance: number;
  } export { FormState };

const Form: React.FC<FormProps> = ({ closeForm, onSubmit, defaultValue }) => {

    const[formState, setFormState] = useState<FormState>(
        defaultValue || {
        id: undefined,
        name: "",
        accountNo: "",
        contactNo: "",
        balance: undefined
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
            if ((e.target as HTMLElement).className === 'Form-container') closeForm();}
            }>
            <div className="Form">
                <form onSubmit={handleSubmit}>
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
                        <button className="btn" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
} 
export default Form;