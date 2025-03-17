"use client";

import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AdvocateTable from "./components/AdvocateTable";
import { Advocate, AdvocateParams } from "./types";

/**
 * TODO:
 * [x] Comment out all code we might axe
 * [x] Get it working for the initial query in useEffect
 * [x] Get it working onChange of input with useRef
 * [x] Query params builder fn
 * [ ] Update the query in api/routes.ts
 */

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [advocateFilter, setAdvocateFilter] = useState("");
  const hasFetched = useRef(false);

  const getQueryParams = useCallback((searchTerm?: string) => {
    const queryParams = new URLSearchParams();

    if (searchTerm) {
      queryParams.set("name", searchTerm);
    }

    return queryParams.toString();
  }, []);

  const getAdvocates = useCallback(async (searchTerm?: string) => {
    const queryString = `/api/advocates?${getQueryParams(searchTerm)}`;
    const response = await fetch(queryString);
    const { data } = await response.json();
    setAdvocates(data);
  }, [getQueryParams]);

  const debounceInputRef = useRef(
    debounce((searchTerm?: string) => getAdvocates(searchTerm), 1000),
  );

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setAdvocateFilter(searchTerm);
    debounceInputRef.current(searchTerm);
  };

  const onResetFilter = () => {
    setAdvocateFilter("");
    getAdvocates();
  };

  useEffect(function initPageData() {
    if (!hasFetched.current) {
      hasFetched.current = true;
      getAdvocates();
    }
  }, [getAdvocates]);

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
        <button onClick={onResetFilter}>Clear</button>
      </div>
      <br />
      <br />
      {advocates?.length > 0 &&
        <AdvocateTable advocates={advocates} />}
      {!advocates?.length && <h1>No advocates found from query</h1>}
    </main>
  );
}
