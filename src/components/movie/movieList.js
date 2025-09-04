import React from "react";
import { useState, useEffect } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "./movieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import { PropTypes } from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
const MovieList = ({ type = "now_playing" }) => {
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const isLoading = !data && !error;
  useEffect(() => {
    if (data && data.results) {
      setMovies(data.results);
    }
  }, [data]);
  return (
    <div className="movie-list">
      {isLoading && (
        <>
          <Swiper grabCursor={"true"} slidesPerView={"auto"} spaceBetween={40}>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
          </Swiper>
        </>
      )}
      {!isLoading && (
        <Swiper grabCursor={"true"} slidesPerView={"auto"} spaceBetween={40}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};
MovieList.propTypes = {
  type: PropTypes.string.isRequired,
};
function ErrorFallback() {
  return <div className="text-red bg-red-50">Error!</div>;
}
export default withErrorBoundary(MovieList, {
  FallbackComponent: ErrorFallback,
});
