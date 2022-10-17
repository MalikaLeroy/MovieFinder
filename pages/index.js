import Head from 'next/head';
import React, { useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import Header from '../components/Header.js';
import BestMovies from '../components/BestMovies.js';
import AllMovies from '../components/AllMovies.js';
import useWindowSize from "../components/useWindowSize";

export default function Home() {

  const windowSize = useWindowSize();

  let initRangeSize = 10
  if (windowSize.width < 375) {
    initRangeSize = 11
  }

  const allSorts = [
    { name: "Les plus populaires", code: "popularity.desc" },
    { name: "Les mieux notés", code: "vote_average.desc" },
    { name: "Les plus récents", code: "release_date.desc" },
    { name: "Ordre alphabétique", code: "original_title.asc" }
  ]

  const allGenres = [
    { id: "", name: "Tous" },
    { id: "28", name: "Action" },
    { id: "27", name: "Horreur" },
    { id: "10749", name: "Amour" }
  ]

  const thisYear = new Date();
  thisYear.toLocaleDateString('fr-CA')
  const oldYearLimite = new Date()
  oldYearLimite.setYear(1874)
  const [allFilters, setAllFilters] = useState({
    sort: allSorts[0].code,
    sortName: allSorts[0].name,
    genre: "",
    genreName: "Genre",
    startDate: null,
    endDate: null,
    limiteDate: thisYear,
    limitOldDate: oldYearLimite,
    currentPage: 1,
    currentRange: 1,
    pages: initializePagination(),
    rangeSize: initRangeSize,
    totalPage: null,
  });

  function dateIsValidDate(date) {
    return date instanceof Date && !isNaN(date);
  }

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const useGetTopRated = () => {
    const { data, error } = useSWR(`${process.env.SERVER}/movie/top_rated?api_key=${process.env.API_KEY}&with_title_translation=fr-FR&with_overview_translation=fr-FR&certification_country=FR&language=fr-FR&page=1`, fetcher);
    return { data, error };
  };

  const useGetAllmovies = () => {
    const { data, error } = useSWR(`${process.env.SERVER}/discover/movie?api_key=${process.env.API_KEY}&with_title_translation=fr-FR&with_overview_translation=fr-FR&certification_country=FR&with_genres=${allFilters.genre}&sort_by=${allFilters.sort}${dateIsValidDate(allFilters.startDate) == true ? `&release_date.gte=${allFilters.startDate.toLocaleDateString('fr-CA')}` : `&release_date.gte=${allFilters.limitOldDate.toLocaleDateString('fr-CA')}`}${dateIsValidDate(allFilters.endDate) == true ? `&release_date.lte=${allFilters.endDate.toLocaleDateString('fr-CA')}` : `&release_date.lte=${allFilters.limiteDate.toLocaleDateString('fr-CA')}&page=${allFilters.currentPage}`}`, fetcher);
    return { data, error }
  };

  const { data: topRatedData, error: topRatedError } = useGetTopRated();
  const { data: allMoviesData, error: allMoviesError } = useGetAllmovies();



  function initializePagination() {
    let initializePagination = []
    for (let i = 1; i < initRangeSize + 1; i++) {
      initializePagination.push(i)

    }
    return initializePagination
  }
  return (
    <>
      <Head>
        <title>Moviefinder : Cinéma, BO de films, Vidéos, DVD et VOdivD</title>
        <meta name="description" content="Moviefinder, le site de référence du cinéma ! Découvrez notre recherche d'horaires de films, l'actualité ciné, les dernières bandes-annonces, et plus encore." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='img-gradient'>
        <Image
          src={'/backgroundimg.jpg'}
          alt='Moviefinder : Cinéma, BO de films, Vidéos, DVD et VOD'
          width={windowSize.width > 375 ? 1208 : 439}
          height={windowSize.width > 375 ? 730 : 265}
          layout={windowSize.width > 375 ? "responsive" : "fixed"}
          quality={100}
          priority={true}
        />
      </div>
      <Header />
      <main>
        <BestMovies topRatedData={topRatedData} topRatedError={topRatedError} />
        <AllMovies initializePagination={initializePagination} allMoviesData={allMoviesData} allMoviesError={allMoviesError} allSorts={allSorts} allGenres={allGenres} allFilters={allFilters} setAllFilters={setAllFilters} />
      </main>
    </>
  )
}

