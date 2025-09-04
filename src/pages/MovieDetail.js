import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "components/movie/movieCard";

const MovieDetail = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);
  if (!data) return <div>Loading...</div>;
  const { backdrop_path, poster_path, title, genres, overview } = data || {};
  return (
    <div className="py-10 ">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div
          className="w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={`${tmdbAPI.image500(poster_path)}`}
          alt=""
          className="object-cover w-full h-full mb-5 rounded-xl"
        />
      </div>
      <h1 className="mb-10 text-5xl font-bold text-center">{title}</h1>
      <div className="flex items-center justify-center mb-10 gap-x-5">
        {genres.map((item) => (
          <div
            key={item.id}
            className="px-4 py-2 border rounded border-primary text-primary"
          >
            {item.name}
          </div>
        ))}
      </div>
      <p className="text-center text-xl leading-relaxed max-w-[600px] mx-auto mb-10">
        {" "}
        {overview}
      </p>
      <MovieMeta type="credits"></MovieMeta>
      <MovieMeta type="videos"></MovieMeta>
      <MovieMeta type="similar"></MovieMeta>
      {/* <MovieCredits></MovieCredits>
      <MovieVideo></MovieVideo>
      <MovieSimiliar></MovieSimiliar> */}
    </div>
  );
};

function MovieMeta({ type = "videos" }) {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(type, movieId), fetcher);
  if (!data) return null;
  const { results } = data || {};
  if (!results || results.length <= 0) return null;
  if (type === "credits") {
    const { cast } = data || {};
    return (
      <div className="">
        <h2 className="mb-10 text-3xl text-center">Casts</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <CastItem key={item.id} item={item}></CastItem>
          ))}
        </div>
      </div>
    );
  } else {
    if (type === "videos") {
      return (
        <div className="py-10">
          <div className="flex flex-col items-center justify-center gap-10">
            {results.slice(0, 1).map((item) => (
              <div className="" key={item.id}>
                <h3 className="inline-block p-3 text-xl font-medium rounded-lg bg-secondary">
                  {item.name}
                </h3>
                <div className="w-[1100px] aspect-video">
                  <iframe
                    width="864"
                    height="486"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="object-fill w-full h-full rounded-lg"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (type === "similar") {
      return (
        <div className="py-10">
          <h2 className="mb-10 text-3xl font-medium">Similar Movies</h2>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              slidesPerView={"auto"}
              spaceBetween={40}
            >
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
    }
  }
  return null;
}

function CastItem({ item }) {
  const { name, profile_path } = item;
  return (
    <div>
      <img
        src={`${tmdbAPI.imageOriginal(profile_path)}`}
        alt=""
        className="w-full h-[230px] object-cover rounded-lg mb-5"
      />
      <h3 className="text-xl font-medium">{name}</h3>
    </div>
  );
}

// function MovieCredits() {
//   const { movieId } = useParams();
//   const { data } = useSWR(tmdbAPI.getMovieMeta("credits", movieId), fetcher);
//   const { cast } = data || {};
//   if (!data) return <div>Loading...</div>;
//   return (
//     <div className="">
//       <h2 className="mb-10 text-3xl text-center">Casts</h2>
//       <div className="grid grid-cols-4 gap-5">
//         {cast.slice(0, 4).map((item) => (
//           <CastItem key={item.id} item={item}></CastItem>
//         ))}
//       </div>
//     </div>
//   );
// }

// function MovieVideo() {
//   const { movieId } = useParams();
//   const { data } = useSWR(tmdbAPI.getMovieMeta("videos", movieId), fetcher);
//   if (!data) return <div>Loading...</div>;
//   const { results } = data || {};
//   if (!results) return <div>Loading...</div>;
//   return (
//     <div className="py-10">
//       <div className="flex flex-col items-center justify-center gap-10">
//         {results.slice(0, 1).map((item) => (
//           <div className="" key={item.id}>
//             <h3 className="inline-block p-3 text-xl font-medium rounded-lg bg-secondary">
//               {item.name}
//             </h3>
//             <div className="w-[1100px] aspect-video">
//               <iframe
//                 width="864"
//                 height="486"
//                 src={`https://www.youtube.com/embed/${item.key}`}
//                 title="YouTube video player"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="object-fill w-full h-full rounded-lg"
//               ></iframe>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function MovieSimiliar() {
//   const { movieId } = useParams();
//   const { data } = useSWR(tmdbAPI.getMovieMeta("similar", movieId), fetcher);
//   if (!data) return <div>Loading...</div>;
//   const { results: movies } = data || {};
//   if (!movies) return <div>Loading...</div>;
//   return (
//     <div className="py-10">
//       <h2 className="mb-10 text-3xl font-medium">Similar Movies</h2>
//       <div className="movie-list">
//         <Swiper grabCursor={"true"} slidesPerView={"auto"} spaceBetween={40}>
//           {movies.length > 0 &&
//             movies.map((item) => (
//               <SwiperSlide key={item.id}>
//                 <MovieCard item={item}></MovieCard>
//               </SwiperSlide>
//             ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }

export default MovieDetail;

// <iframe width="914" height="514" src="https://www.youtube.com/embed/MbohuBUxcRU" title="Keanu Reeves Talks Voicing Shadow | Sonic 3 EXCLUSIVE Behind the Scenes | Paramount Movies" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
