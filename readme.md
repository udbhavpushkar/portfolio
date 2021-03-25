# Stock Portfolio Tracking API


<p align="center">
<img src="https://img.shields.io/badge/made by-udbhavpushkar-green">
<img src="https://img.shields.io/badge/PRs-welcome-yellow">
</p>


### Documentation


This document explains the business requirements of a portfolio tracking API.

- #### Securities: 
A simple definition of a security is any proof of ownership or debt that has been
assigned a value and may be sold.

- #### Ticker Symbol: 
Every listed security has a unique ticker symbol, facilitating the vast array of
trade orders that flow through the financial markets every day.

- #### Portfolios: 
A portfolio is a grouping of financial assets such as stocks, bonds, commodities,
currencies and cash equivalents, as well as their fund counterparts, including mutual,
exchange-traded and closed funds.



***
***

### Endpoints

- <p><strong>POST</strong> <code> / </code> </p>
##### Insert New security
<code>{<br> "name": name-security,<br>
    "ticker": ticker-name,<br>
    "price": price<br>
}</code>

***
- <p><strong>GET</strong> <code> / </code> </p>
##### To fetch all the securities and its corresponding trades.

***
- <p><strong>GET</strong> <code> /portfolio </code> </p>
##### To Calculate and return Cumulative returns


***
- <p><strong>GET</strong> <code> /portfolio/{security_ticker} </code> </p>
##### To fetch all the portfolio details and trades of the given security.

***
- <p><strong>PATCH</strong> <code> /portfolio/{security_ticker}/{tradeType} </code> </p>
##### Add trade for the given security. 'tradeType' is either buy or sell
<code>{<br> "quantity": quantity to buy or sell,<br>
    "price": current price<br>
}</code>