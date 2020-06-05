import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import axios from '../axios-quotes';

export default ({ currentUser, logout }) => {
    const [stock, setStock] = useState([]);
    console.log(currentUser); 

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://roberthood-edcdd.firebaseio.com/bqh5026/portfolio.json`,
    })
      .then((res) => {
        const portfolio = [];
        for (let stock in res.data) {
          portfolio.push({ ...res.data[stock], firebaseID: stock });
        }
        setStock(portfolio);
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

    
    return (
        <div className="portfolio-wrapper">
             
            <nav className="portfolio-header">
            <Link to="/dashboard">
                <img className="portfolio-logo" src={roberthoodHatURL} />
            </Link>
            <h1>Portfolio</h1>
            </nav>

            <div className="portfolio-container">
                {stock.map((item, idx) => (
                <div key={idx} className="portfolio">
                    <ul className="portfolio-item">
                    <li>{item.symbol}</li>
                    <li>{item.latest_price}</li>
                    <li>{item.change_percent_s}</li>
                    </ul>
                    <button className="sell-stock">
                    Sell stock
                    </button>
                </div>
                ))}
            </div>

        </div>
    );
}
