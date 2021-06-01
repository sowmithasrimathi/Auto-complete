import React, { useEffect, useRef, useState } from "react";
import AutoComplete from "./AutoComplete";

const Country = () => {
    const [Suggestion, SetSuggestion] = useState([]);
    const [Search, SetSearch] = useState("");
    const [Result, SetResult] = useState();
    const [isVisbile, setVisiblity] = useState(false);
    const [isResultVisbile, setResultVisiblity] = useState(false);
    const searchContainer = useRef(null);
    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });
    const handleClickOutside = (event) => {
        if (
            searchContainer.current &&
            !searchContainer.current.contains(event.target)
        ) {
            hideSuggestion();
        }
    };
    const showSuggestion = () => setVisiblity(true);

    const hideSuggestion = () => setVisiblity(false);
    useEffect(() => {
        fetch("https://restcountries.eu/rest/v2/all")
            .then((res) => res.json())
            .then((data) => {
                SetSuggestion(
                    data.filter((i) =>
                        i.name.toLocaleLowerCase().includes(Search.toLocaleLowerCase())
                    )
                );
                console.log(data);
            });
    }, [Search]);
    return (
        <div id="Full">
            <div id="Container">
                <div>
                    <input
                        type="text"
                        placeholder="Enter the Country name"
                        onChange={(e) => {
                            SetSearch(e.target.value);
                        }}
                        onClick={() => {
                            showSuggestion();
                            setResultVisiblity(false);
                        }}
                        value={Search}
                    />
                </div>
                <div
                    id="Box"
                    ref={searchContainer}
                    style={{ display: `${isVisbile ? "block" : "none"}` }}
                >
                    <ul>
                        {Suggestion.map((i, ind) => {
                            return (
                                <li
                                    key={ind}
                                    onClick={() => {
                                        SetSearch(i.name);
                                        hideSuggestion();
                                        SetResult(i);
                                        setResultVisiblity(true);
                                    }}
                                >
                                    <div className="Card">
                                        <p>
                                            <img src={i.flag} width={20} height={20} alt={i.name} />{" "}
                                            {i.name}
                                        </p>
                                        <p>Capital : {i.capital}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div
                id="Result"
                style={{ display: `${isResultVisbile ? "block" : "none"}` }}
            >
                <AutoComplete {...Result} />
            </div>
        </div>
    );
};

export default Country;
