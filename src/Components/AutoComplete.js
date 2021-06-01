import React from "react";

const AutoComplete = (props) => {
    return (
        <div>
            <div>
                <img src={props.flag} alt={props.name} height={100} width={200} />
                <h1>Country : {props.name}</h1>
                <h2>Capital : {props.capital}</h2>
                <h3>Population : {props.population}</h3>
            </div>
        </div>
    );
};
export default AutoComplete;
