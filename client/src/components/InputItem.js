import React, {Fragment, useState} from "react";

const InputItem = () => {

    const [description , setDescription] = useState("")

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/"; //once a response has been sent, the page will refresh

        } catch (error) {
            console.error(error.message);
        }
    }

    return(
        <Fragment>
            <h1 className="text-center mt-5">Shopping List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
};

export default InputItem;