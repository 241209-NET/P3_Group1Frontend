import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerList.css";
import { Link } from "react-router-dom";
import { useUserContext } from './UserContext';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("name"); // "name", "rating-asc", "rating-desc"
  const {currentURL} = useUserContext();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${currentURL}/api/Customers`);
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  // Sort order function
  const sortCustomers = (order) => {
    const sorted = [...customers]; // Create a shallow copy to avoid mutating state directly
    if (order === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "rating-asc") {
      sorted.sort((a, b) => a.avgRating - b.avgRating);
    } else if (order === "rating-desc") {
      sorted.sort((a, b) => b.avgRating - a.avgRating);
    }
    setSortOrder(order);
    setCustomers(sorted);
  };

  // Toggle between ascending and descending rating sort order
  const handleRatingSort = () => {
    const newOrder = sortOrder === "rating-asc" ? "rating-desc" : "rating-asc";
    sortCustomers(newOrder);
  };

  // Get the top 3 and bottom 3 customers
  const sortedByRatingDesc = [...customers].sort((a, b) => b.avgRating - a.avgRating); // Sort customers by rating (descending)
  const top3Customers = sortedByRatingDesc.slice(0, 3); // Hall of Fame
  const bottom3Customers = [...sortedByRatingDesc].slice(-3).reverse(); // Hall of Shame

  return (
    <div className="customer-page">
      <header className="header">
        <h1>Customer List</h1>
      </header>

      {/* All customers table */}
      <table className="customer-table">
        <thead>
          <tr>
            <th
              onClick={() => sortCustomers("name")}
              className={sortOrder === "name" ? "sortable active" : "sortable"}
            >
              Name
            </th>
            <th
              onClick={handleRatingSort}
              className={sortOrder.startsWith("rating") ? "sortable active" : "sortable"}
            >
              Rating
            </th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
        {customers.map((customer, index) => (
          <tr key={index} className="customer-row">
            <td>
              <Link to={`/customer/${customer?.id}`} className="link-card">
                {customer.name}
              </Link>
            </td>
            <td>
                {customer.avgRating}/5⭐
            </td>
            <td>
                <img
                  src={customer.url || "https://via.placeholder.com/150"}
                  alt={`${customer.name}'s avatar`}
                  className="customer-image"
                />
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      {/* Top and Bottom 3 customer tables */}
      <div className="top-bottom-tables">
        <h2>Hall of Fame</h2>
        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {top3Customers.map((customer, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/customer/${customer?.id}`} className="link-card">
                    {customer.name}
                  </Link>
                </td>
                <td>{customer.avgRating}/5⭐</td>
                <td>
                  <img
                    src={customer.url || "https://via.placeholder.com/150"}
                    alt={`${customer.name}'s avatar`}
                    className="customer-image"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Hall of Shame</h2>
        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {bottom3Customers.map((customer, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/customer/${customer?.id}`} className="link-card">
                    {customer.name}
                  </Link>
                </td>
                <td>{customer.avgRating}/5⭐</td>
                <td>
                  <img
                    src={customer.url || "https://via.placeholder.com/150"}
                    alt={`${customer.name}'s avatar`}
                    className="customer-image"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerList;
