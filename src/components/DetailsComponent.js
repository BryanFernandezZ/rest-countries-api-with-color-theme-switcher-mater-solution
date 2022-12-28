import { Component, useEffect, useState } from "react"

export default function DetailsComponent(props) {

    const [name, setName] = useState(props.name);
    const [country, setCountry] = useState({});
    const [load, setLoad] = useState(false);

    useEffect(() => {
        fetch(`https://restcountries.com/v2/name/${name}`)
            .then((res) => res.json())
            .then((data) => {
                setCountry(data[0]);
                console.log(data[0]);
                setLoad(true);
            });
    }, []);

    if (load) {
        return (
            <div className="details_container">
                <div className="box" onClick={() => { back() }}>
                    <div className="button_back">
                        <i className="fa-solid fa-arrow-left-long"></i>
                        <span>Back</span>
                    </div>
                </div>

                <div className="details_content">
                    <div className="country_image">
                        <img src={country.flags.png} alt="" />
                    </div>

                    <div className="country_details">
                        <div className="country_name">
                            <h2>{country.name}</h2>
                        </div>

                        <div className="details_middle">
                            <div className="main_details">
                                <div>
                                    <span className="tag">Native Name: </span>
                                    <span className="tag_value">{country.nativeName}</span>
                                </div>
                                <div>
                                    <span className="tag">Population: </span>
                                    <span className="tag_value">{country.population}</span>
                                </div>
                                <div>
                                    <span className="tag">Region: </span>
                                    <span className="tag_value">{country.region}</span>
                                </div>
                                <div>
                                    <span className="tag">Sub Region: </span>
                                    <span className="tag_value">{country.subregion}</span>
                                </div>
                                <div>
                                    <span className="tag">Capital: </span>
                                    <span className="tag_value">{country.capital}</span>
                                </div>
                            </div>

                            <div className="other_details">
                                <div>
                                    <span className="tag">Top Level Domain: </span>
                                    <span className="tag_value">{country.topLevelDomain[0]}</span>
                                </div>
                                <div>
                                    <span className="tag">Currencies: </span>
                                    <span className="tag_value">{country.currencies[0].name}</span>
                                </div>
                                <div>
                                    <span className="tag">Languages: </span>
                                    {country.languages.map((l, index) => {
                                        return (
                                            <span key={index}>{l.name}, </span>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="border_countries">
                            <div className="border_countries_title">
                                Border Countries
                            </div>
                            <div className="border_countries_items">
                                {
                                    country.borders.map((b, index) => {
                                        return (
                                            <div key={index} className="box detail_box">
                                                <span>{b}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function back() {
    window.location.href = "/";
}