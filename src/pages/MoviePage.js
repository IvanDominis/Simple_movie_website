import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "config";
import MovieCard from "components/movie/movieCard";
import ReactPaginate from "react-paginate";
import useDebounce from "hooks/useDebounce";
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
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (filterDebounce)
      setUrl(`${tmdbAPI.getMovieSearch(filterDebounce, nextpage)}`);
    else setUrl(`${tmdbAPI.getMovieList("popular", nextpage)}`);
  }, [filterDebounce, nextpage]);
  const movies = data?.results || [];
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
      {loading && (
        <div className="w-10 h-10 mx-auto border rounded-full border-4-t-4 animate-spin border-t-transparent border-primary"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviePage;
