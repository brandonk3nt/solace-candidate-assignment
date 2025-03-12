"use client";

import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import AdvocateTable from "./components/AdvocateTable";
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

  const queryAdvocates = useMemo(
    () =>
      debounce((searchTerm: string) => {
        const filteredAdvocates = advocates.filter((advocate: Advocate) => {
          return (
            advocate.firstName.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            advocate.lastName.toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        });

        setFilteredAdvocates(filteredAdvocates);
      }, 1000),
    [advocates],
  );

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setAdvocateFilter(searchTerm);
    queryAdvocates(searchTerm);
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
          onChange={onFilterChange}
        />
        <button onClick={onResetFilter}>Reset Search</button>
      </div>
      <br />
      <br />
      <AdvocateTable advocates={filteredAdvocates} />
    </main>
  );
}
