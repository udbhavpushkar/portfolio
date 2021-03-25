# Stock Portfolio


<p align="center">
<img src="https://img.shields.io/badge/made by-udbhavpushkar-green">
<img src="https://img.shields.io/badge/PRs-welcome-yellow">
</p>


### Documentation


This document explains the business requirements of a portfolio tracking API.
***

- <p><strong>POST</strong> <code> / </code> </p>
##### Insert New portfolio
<code>{<br> "name": name-security,<br>
    "ticker": ticker-name,<br>
    "price": price<br>
}</code>

***
- <p><strong>GET</strong> <code> / </code> </p>
##### To fetch all the portfolio details

***
- <p><strong>GET</strong> <code> /portfolio/{security_ticker} </code> </p>
##### To fetch all the portfolio details and trades of the given security.

***
- <p><strong>PATCH</strong> <code> /portfolio/{security_ticker}/{tradeType} </code> </p>
##### Add trade for the given security.
<code>{<br> "quantity": quantity to buy or sell,<br>
    "price": current price<br>
}</code>