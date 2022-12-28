import { Component, useEffect, useState } from "react";

export default function HomeComponent() {

    const [country, setCountry] = useState("");
    const [resCountries, setResCountries] = useState([]);
    const [countries, setCountries] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (!load) {
            fetch("https://restcountries.com/v2/all")
                .then(async (res) => await res.json())
                .then((data) => {
                    setResCountries(data);
                    setCountries(data);
                    setLoad(true);
                    console.log(data[0]);
                })
        }
    }, [])

    const searchByCountry = (e) => {
        e.preventDefault();

        if (country !== null || country !== undefined || country !== "") {
            window.location.href = `/details/${country}`;
        }

        setCountry("");
    }

    const filter = (region) => {
        if (region !== "default") {
            setCountries(resCountries.filter(c => c.region == region));
        } else {
            setCountries(resCountries);
        }
    }

    const details = (name) => {
        window.location.href = `/details/${name}`;
    }

    if (load) {
        return (
            <div className="home_container">
                <div className="search_container">
                    <div className="search_container_center">
                        <div className="search">
                            <form onSubmit={e => searchByCountry(e)}>
                                <button type="submit">
                                    <i className="fa-solid fa-search"></i>
                                </button>
                                <input type="text" placeholder="Search for a country..." onChange={(e) => { setCountry(e.target.value) }} value={country} />
                            </form>
                        </div>

                        <div className="filter">
                            <select name="filter" id="filter" onChange={(e) => filter(e.target.value)}>
                                <option value="default">Filter by Region</option>
                                <option value="Africa">Africa</option>
                                <option value="America">America</option>
                                <option value="Asia">Asia</option>
                                <option value="Europe">Europe</option>
                                <option value="Oceania">Oceania</option>
                            </select>
                            <i className="fa-sharp fa-solid fa-chevron-down"></i>
                        </div>
                    </div>
                </div>

                <div className="countries">
                    {
                        countries.map((country, index) => {
                            return (
                                <div key={index} className="card" onClick={() => { details(country.name) }}>
                                    <div className="card_image">
                                        <img src={country.flags.png} alt="flag" loading="lazy" />
                                    </div>
                                    <div className="card_content">
                                        <h2>{country.name}</h2>
                                        <div>
                                            <span>Population: </span>
                                            {country.population}
                                        </div>
                                        <div>
                                            <span>Region: </span>
                                            {country.region}
                                        </div>
                                        <div>
                                            <span>Capital: </span>
                                            {country.capital}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}