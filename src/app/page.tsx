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
 * [ ] Query params builder fn
 * [ ] Update the query in api/routes.ts
 */

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [advocateFilter, setAdvocateFilter] = useState("");
  const hasFetched = useRef(false);

  const getQueryParams = useCallback(() => {
    const queryParams = new URLSearchParams();

    if (advocateFilter.length) {
      queryParams.set("name", advocateFilter);
    }

    return queryParams.toString();
  }, [advocateFilter]);

  const getAdvocates = useCallback(async () => {
    const response = await fetch(`/api/advocates?${getQueryParams()}`);
    const { data } = await response.json();
    setAdvocates(data);
  }, [getQueryParams]);

  const debounceInputRef = useRef(debounce(() => getAdvocates(), 1000));

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setAdvocateFilter(searchTerm);
    debounceInputRef.current();
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
        <button onClick={onResetFilter}>Reset Search</button>
      </div>
      <br />
      <br />
      <AdvocateTable advocates={advocates} />
    </main>
  );
}
