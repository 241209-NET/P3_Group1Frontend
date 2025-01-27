import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerList.css";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("name"); // "name", "rating-asc", "rating-desc"

  useEffect(() => {
    // Fetch data from API (Uncomment when ready to fetch real data)
    // const fetchCustomers = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:8080/api/Customers");
    //     setCustomers(response.data);
    //   } catch (error) {
    //     console.error("Error fetching customers:", error);
    //   }
    // };
    // fetchCustomers();

    // Hardcoded customer data for now
    const fetchedCustomers = [
      { name: "John Doe", rating: 5, pictureUrl: "https://thispersondoesnotexist.com/" },
      { name: "Jane Smith", rating: 3, pictureUrl: "https://thispersondoesnotexist.com/" },
      { name: "Sam Lee", rating: 4, pictureUrl: "https://thispersondoesnotexist.com/" },
      { name: "Emily Davis", rating: 2, pictureUrl: "https://thispersondoesnotexist.com/" },
      { name: "Chris Wilson", rating: 1, pictureUrl: "https://thispersondoesnotexist.com/" },
      { name: "Alice Brown", rating: 4, pictureUrl: "https://thispersondoesnotexist.com/" },
    ];
    setCustomers(fetchedCustomers);
  }, []);

  // Sort order
  const sortCustomers = (order) => {
    const sorted = [...customers];
    if (order === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name
    } else if (order === "rating-asc") {
      sorted.sort((a, b) => a.rating - b.rating); // Sort by rating in asc
    } else if (order === "rating-desc") {
      sorted.sort((a, b) => b.rating - a.rating); // Sort by rating in des
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
  const sortedByRatingDesc = [...customers].sort((a, b) => b.rating - a.rating); // sort all customers
  const top3Customers = sortedByRatingDesc.slice(0, 3); // Hall of Fame
  const bottom3Customers = sortedByRatingDesc.slice(-3); // Hall of Shame

  return (
    <div className="customer-page">
      <header className="header">
        <h1>Customer List</h1>
      </header>

      {/* All customer table */}
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
              <td>{customer.name}</td>
              <td>{customer.rating}/5</td>
              <td>
                <img
                  src={customer.pictureUrl}
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
                <td>{customer.name}</td>
                <td>{customer.rating}/5</td>
                <td>
                  <img
                    src={customer.pictureUrl}
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
                <td>{customer.name}</td>
                <td>{customer.rating}/5</td>
                <td>
                  <img
                    src={customer.pictureUrl}
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
