"use client";

import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AdvocateTable from "./components/AdvocateTable";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [specialtiesFilter, setSpecialtiesFilter] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [advocateFilter, setAdvocateFilter] = useState("");

  const getAdvocates = useCallback(async () => {
    setIsLoading(true);
    const queryParams = new URLSearchParams();

    if (advocateFilter) {
      queryParams.set("name", advocateFilter);
    }

    const queryString = `/api/advocates?${queryParams.toString()}`;
    const response = await fetch(queryString);
    const { data } = await response.json();
    setAdvocates(data);
    setIsLoading(false);
  }, [advocateFilter]);

  const getSpecialties = useCallback(async () => {
    const response = await fetch(`/api/specialties`);
    const { data } = await response.json();
    const specialtiesState = data.reduce((result, item) => {
      result[item] = false;
      return result;
    }, {});
    setSpecialtiesFilter(specialtiesState);
  }, []);

  const debounceInputRef = useRef(
    debounce(() => getAdvocates(), 1000),
  );

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setAdvocateFilter(searchTerm);
  };

  const onResetFilter = () => {
    setAdvocateFilter("");
    getAdvocates();
  };

  const onSpecialtyChange = (event) => {
    const specialty = event.target.name;
    setSpecialtiesFilter({
      ...specialtiesFilter,
      [specialty]: event.target.checked,
    });
  };

  useEffect(function initPageData() {
    getAdvocates();
    getSpecialties();
  }, [getAdvocates, getSpecialties]);

  useEffect(() => {
    debounceInputRef.current = debounce(() => getAdvocates(), 1000);
  }, [getAdvocates]);

  useEffect(function queryAdvocates() {
    debounceInputRef.current();
  }, [specialtiesFilter, advocateFilter]);

  return (
    <main className="p-8">
      <h1 className="mb-8 text-center font-bold text-3xl">Solace Advocates</h1>
      <div className="flex">
        <div className="mr-2 p-2 border-2 border-emerald-800 rounded">
          <h1 className="mb-4 text-center font-bold text-xl">
            Facets
          </h1>
          <p>Search By Name:</p>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={advocateFilter}
            onChange={onFilterChange}
          />
          <button
            className="ml-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-emerald-100"
            onClick={onResetFilter}
          >
            Clear
          </button>
          <div className="pt-4 text-xs">
            {Object.keys(specialtiesFilter)?.length > 0 &&
              Object.keys(specialtiesFilter).map((specialty) => (
                <div key={specialty}>
                  <input
                    checked={specialtiesFilter[specialty]}
                    onChange={onSpecialtyChange}
                    type="checkbox"
                    id="scales"
                    name={specialty}
                  />
                  <label htmlFor={specialty}>{specialty}</label>
                </div>
              ))}
          </div>
        </div>
        {isLoading && "Loading data..."}
        {advocates?.length > 0 && !isLoading &&
          <AdvocateTable advocates={advocates} />}
        {advocates?.length === 0 && !isLoading &&
          <h1>No advocates found</h1>}
      </div>
    </main>
  );
}
