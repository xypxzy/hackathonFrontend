import React from "react";
import AppContext from "../context";

const Info=({
                title,
                imageurl,
                description } ) => {
    const{setCartOpened}=React.useContext(AppContext)

    return(
        <div className="cartEmpty d-flexa align-center justify-center flex-column flex">
            <img className="mb-20 flex"
                 width='120px'
                 //height='120px'
                 src={imageurl} alt={"emptycart img"} />
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={()=>setCartOpened(false)} className="greenButton">
                <img src="/img/arrow.svg" alt="Arrow svg" />
                Back
            </button>
        </div>
    )
}
export default Info;