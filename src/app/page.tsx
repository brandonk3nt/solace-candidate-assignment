"use client";

import { useEffect, useState } from "react";
import AdvocateTableRow from "./components/AdvocateTableRow";
import { Advocate } from "./types";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [advocateFilter, setAdvocateFilter] = useState("");

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;
    setAdvocateFilter(searchTerm);

    const filteredAdvocates = advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName.toLowerCase()
          .includes(advocateFilter.toLowerCase()) ||
        advocate.lastName.toLowerCase()
          .includes(advocateFilter.toLowerCase())
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onResetFilter = () => {
    setAdvocateFilter("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <input
          style={{ border: "1px solid black" }}
          value={advocateFilter}
          onChange={onChange}
        />
        <button onClick={onResetFilter}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, i) => (
            <AdvocateTableRow key={i} advocate={advocate} />
          ))}
        </tbody>
      </table>
    </main>
  );
}
