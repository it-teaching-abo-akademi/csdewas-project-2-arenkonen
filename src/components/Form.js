import React from "react";

//Input form for the stocks
export default ({ handleChange, handleSubmit, post}) =>{
        return (
            <form onSubmit= {handleSubmit}>
                <label>
                    Stock name:
                    <input name="name" type="text" value={post.name} onChange={handleChange} />
                </label>
                <label>
                    Stock quantity:
                    <input name="quantity" type="number" value={post.quanitity} onChange={handleChange} />
                </label>
                <label>
                {/* Date input only valid as YYYYMMDD */}
                    Stock purchase date (Enter as YYYYMMDD):
                    <input name="purchasedate" type="text" value={post.purchasedate} onChange={handleChange} />
                </label>
                <input type="submit" value="Add Stock"/>
            </form>
        );
    }

