import { Fragment, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "components/layout/Main";
import "swiper/scss";
// import HomePage from "pages/HomePage";
// import Banner from "components/banner/Banner";
// import MoviePage from "pages/MoviePage";
// import MovieDetail from "pages/MovieDetail";
const HomePage = lazy(() => import("pages/HomePage"));
const Banner = lazy(() => import("components/banner/Banner"));
const MoviePage = lazy(() => import("pages/MoviePage2"));
const MovieDetail = lazy(() => import("pages/MovieDetail"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movie" element={<MoviePage></MoviePage>}></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetail></MovieDetail>}
            ></Route>
            <Route path="*" element={<>Not found</>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
