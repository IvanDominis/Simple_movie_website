import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "config";
import MovieCard, { MovieCardSkeleton } from "components/movie/movieCard";
import useDebounce from "hooks/useDebounce";
import { v4 } from "uuid";
import Button from "components/button/Button";
import useSWRInfinite from "swr/infinite";
const itemsPerPage = 20;

const MoviePage = () => {
  const [nextpage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [url, setUrl] = useState(
    `${tmdbAPI.getMovieList("popular", nextpage)}`
  );
  const filterDebounce = useDebounce(filter, 500);
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const { data, size, setSize, error } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 2}`),
    fetcher
  );
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  const loading = !data && !error;
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);
  useEffect(() => {
    if (filterDebounce)
      setUrl(`${tmdbAPI.getMovieSearch(filterDebounce, nextpage)}`);
    else setUrl(`${tmdbAPI.getMovieList("popular", nextpage)}`);
  }, [filterDebounce, nextpage]);
  useEffect(() => {
    if (!data || !data.results) return;
    const calc = Math.ceil(data.total_results / itemsPerPage);
    setPageCount(calc > 500 ? 500 : calc);
  }, [data, itemOffset]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 text-white rounded-lg outline-none bg-slate-800"
            placeholder="Type here to search..."
            onChange={handleFilter}
          ></input>
        </div>
        <button className="p-4 text-white rounded-lg bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
      {/* {loading && (
        <div className="w-10 h-10 mx-auto border rounded-full border-4-t-4 animate-spin border-t-transparent border-primary"></div>
      )} */}
      {loading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map((_, index) => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-10 text-center">
        <Button
          onClick={() => (isReachingEnd ? null : setSize(size + 1))}
          disabled={isReachingEnd}
          className={`${isReachingEnd ? "bg-slate-300" : ""} `}
        >
          Load More
        </Button>
      </div>
    </div>
  );
};

export default MoviePage;
