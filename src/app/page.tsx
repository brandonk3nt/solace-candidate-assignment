"use client";

import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AdvocateTable from "./components/AdvocateTable";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [specialties, setSpecialties] = useState([]);
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

  const getSpecialties = useCallback(async () => {
    const response = await fetch(`/api/specialties`);
    const { data } = await response.json();
    setSpecialties(data);
  }, []);

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
<<<<<<< HEAD
      getSpecialties();
=======
>>>>>>> master
    }
  }, [getAdvocates]);

  return (
    <main className="p-8">
      <h1 className="mb-8 text-center font-bold text-xl">Solace Advocates</h1>
      <div className="mb-8">
        <p>Search By Name:</p>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={advocateFilter}
          onChange={onFilterChange}
        />
        {
          /* {specialties?.length > 0 &&
          specialties.map((specialty) => <div key={specialty}>{specialty}
          </div>)} */
        }
        <button
          className="ml-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-emerald-100"
          onClick={onResetFilter}
        >
          Clear
        </button>
      </div>
      {advocates?.length > 0 &&
        <AdvocateTable advocates={advocates} />}
      {(!advocates || !advocates.length) &&
        <h1>No advocates found</h1>}
    </main>
  );
}
