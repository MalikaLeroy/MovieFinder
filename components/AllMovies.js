import useOutsideClick from "./useOutsideClick";
import React, { useState, useRef,useEffect } from 'react';
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropDownArrow from '../public/dropdownarrow.svg';
import styles from '../styles/modules/AllMovies.module.scss';
import LoaderError from './LoaderError';

export default function AllMovies({ initializePagination,allMoviesData, allMoviesError, allSorts, allGenres, allFilters, setAllFilters }) {


    const datePicker = useRef(null);
    const sort = useRef(null);
    const filter = useRef(null);
    const getOffset = useRef(null);
    const [datePickerAnim, SetdatePickerAnim] = useState('close');
    const [scrollTop, setScrollTop] = useState(0);
    const [scrolling, setScrolling] = useState(false)


    
   
  useEffect(() => {
  
    const onScroll = e => {
        const { offsetTop } = getOffset.current;
        
        setScrollTop(e.target.documentElement.scrollTop);
        if(scrollTop > offsetTop){
            setScrolling(e.target.documentElement.scrollTop > scrollTop);
            SetdatePickerAnim('close');}
     
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);

  }, [scrollTop]);

    const handleClick = (e) => {
        if(datePickerAnim == 'close'){
            SetdatePickerAnim('animate');
            setTimeout(() => {
                SetdatePickerAnim('open');
              }, "100")
        }else{
            SetdatePickerAnim('animate');
            setTimeout(() => {
                SetdatePickerAnim('close');
              }, "100")
        }
    }
    useOutsideClick(datePicker, () => {
        SetdatePickerAnim('close');
    });
    useOutsideClick(sort, () => {
        sort.current.open = false
    });
    useOutsideClick(filter, () => {
        filter.current.open = false
    });

    
    const handleChangeSelect = (event, type, name) => {
        filter.current.open = false
        sort.current.open = false
        allFilters = { ...allFilters, [type]: event.target.value, [type + "Name"]: name, currentPage: 1,pages:initializePagination(),currentRange:1,totalPage: allMoviesData.total_pages }
        setAllFilters(allFilters);
    }
    const handleDateSelect = (dates) => {
        const start = dates[0]
        const end = dates[1]
        allFilters = { ...allFilters, startDate: start, endDate: end, currentPage: 1,pages:initializePagination(),totalPage: allMoviesData.total_pages}
        setAllFilters(allFilters)
    }
    const handleChangePage = (e,pageNumer) => {
        e.preventDefault()
        const { offsetTop } = getOffset.current;
        window.scrollTo({top: offsetTop, left: 0, behavior: 'smooth'});
        allFilters = { ...allFilters, currentPage: pageNumer,currentRange:1,totalPage: allMoviesData.total_pages }
        setAllFilters(allFilters); 
    }
    

    return (
        
        <section className={styles.content}>
            <header>
                <h2>Tous les films</h2>
                <div>
                    <div ref={getOffset} className={styles.sort}>
                        <span>Trier par :</span>
                        <div>
                            <details ref={sort} className={styles.customSelect} open={scrolling==false && ""}>
                                <summary>
                                    {allFilters.sortName}<DropDownArrow />
                                </summary>
                                <ul>
                                    {allSorts.map(sort =>
                                        allSorts[0] == sort ?
                                            <li key={sort.code}>
                                                <label htmlFor={`item${sort.code}`} >{sort.name}
                                                    <input onChange={event => handleChangeSelect(event, "sort", sort.name)} type="radio" name="sortList" id={`item${sort.code}`} value={sort.code} defaultChecked />
                                                </label>
                                            </li>
                                            :
                                            <li key={sort.code}>
                                                <label htmlFor={`item${sort.code}`} >{sort.name}
                                                    <input onChange={event => handleChangeSelect(event, "sort", sort.name)} type="radio" name="sortList" id={`item${sort.code}`} value={sort.code} />
                                                </label>
                                            </li>
                                    )}
                                </ul>
                            </details>
                        </div>
                    </div>
                    <div className={styles.filters}>
                        <span>Filtrer par :</span>
                        <div>
                            <details ref={filter} className={styles.customSelect} open={scrolling==false && ""}>
                                <summary>
                                    {allFilters.genreName}<DropDownArrow />
                                </summary>
                                <ul>
                                    {allGenres.map(genre =>
                                        <li key={genre.id}>
                                            <label htmlFor={`item${genre.id}`} >{genre.name}
                                                <input onChange={event => handleChangeSelect(event, "genre", genre.name)} type="radio" name="genreList" id={`item${genre.id}`} value={genre.id} />
                                            </label>
                                        </li>
                                    )}
                                </ul>
                            </details>
                        </div>
                        <div>
                            <div ref={datePicker} className={styles.datePicker}>
                                <button onClick={handleClick}>
                                    {allFilters.startDate == null ? 'Année' : allFilters.startDate.getFullYear()}
                                    {allFilters.endDate != null && ' - ' + allFilters.endDate.getFullYear()}
                                </button>
                            <div className={datePickerAnim}>
                             {datePickerAnim != "close" &&
                                    <DatePicker
                                        calendarClassName={styles.datePickerCalendar}
                                        placeholderText={"Date"}
                                        selectsRange
                                        startDate={allFilters.startDate}
                                        endDate={allFilters.endDate}
                                        dateFormat="yyyy"
                                        showYearPicker
                                        onChange={handleDateSelect}
                                        maxDate={allFilters.limiteDate}
                                        minDate={allFilters.limitOldDate}
                                        showDisabledMonthNavigation
                                        inline
                                        nextYearButtonLabel={'Années suivantes'}
                                        previousYearButtonLabel={'Années précédentes'}
                                        selected={allFilters.startDate}
                                        selectsDisabledDaysInRange
                                    />
                                }
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {allMoviesError ? <LoaderError type={'error'}>Oups, la liste n'est actuellement pas disponible</LoaderError>
                : !allMoviesData ? <LoaderError type={'loader'} />
                    :
                    <div>
                        {allMoviesData.results.map(movies =>
                            <MovieCard
                                originalSize={154}
                                width={138}
                                height={207}
                                movies={movies}
                                key={movies.id}
                            />
                        )}
                    </div>
            }
            {allMoviesError ? null
                : !allMoviesData ? null
                    : <Pagination setAllFilters={setAllFilters} allMoviesData={allMoviesData} allFilters={allFilters} handleChangePage={handleChangePage} allMoviesError={allMoviesError} />
            }
        </section>
    )
}