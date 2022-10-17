
import styles from '../styles/modules/Pagination.module.scss';
import PaginationPreviousArrow from '../public/paginationpreviousarrow.svg';
import PaginationNextArrow from '../public/paginationnextarrow.svg';
export default function Pagination({ allFilters, setAllFilters, allMoviesData, handleChangePage, allMoviesError, }) {

    let arrPages = []
    function rangeUpdate(incr) {
        if (incr == "next") {
            for (let i = allFilters.currentRange + 1; i < (allFilters.currentRange + allFilters.rangeSize + 1); i++) {
                arrPages.push(i)
            }
            return arrPages
        } else {
            for (let i = allFilters.currentRange - 1; i < (allFilters.currentRange + allFilters.rangeSize - 1); i++) {
                arrPages.push(i)
            }
            return arrPages
        }
    }
    let limitation = allMoviesError || !allMoviesData ? 0 : allMoviesData.total_pages
    const handleChangePrevNext = (buttonType, status) => {
       
        if (status == "active") {
            
            if (buttonType == "next") {
                let pageRange = { ...allFilters, currentRange: allFilters.currentRange + 1, pages: rangeUpdate('next') }
                setAllFilters(pageRange)
            } else {
                let pageRange = { ...allFilters, currentRange: allFilters.currentRange - 1, pages: rangeUpdate('prev') }
                setAllFilters(pageRange)
            }
        }
    }
    return (
        <footer className={styles.content}>
            <ul>
                <li>
                    <a
                        role="button"
                        className={allFilters.pages[allFilters.rangeSize - 1] > allFilters.rangeSize ? "active" : "inactive"}
                        onClick={() => handleChangePrevNext("prev", allFilters.pages[allFilters.rangeSize - 1] > allFilters.rangeSize ? "active" : "inactive")}
                        tabIndex="0"
                        aria-disabled="true"
                        aria-label="Page précédente"
                        rel="prev">
                        <span aria-hidden="true">
                            <PaginationPreviousArrow title="Les 10 pages précédente" />
                        </span>
                        <span className='visually-hidden'>Les 10 pages précédentes</span>
                    </a>
                </li>
                {allFilters.pages.map(pageNumber =>
                    <li key={pageNumber}>
                        <a
                            role="button"
                            onClick={(e) => handleChangePage(e,pageNumber)}
                            aria-label={`Page ${pageNumber}`}>{pageNumber}
                        </a>
                    </li>
                )}

                <li>
                    <a
                        role="button"
                        onClick={() => handleChangePrevNext("next", allFilters.totalPage == null ? allFilters.pages[allFilters.rangeSize - 1] < limitation ? "active" : "inactive" : allFilters.pages[allFilters.rangeSize - 1] < allFilters.totalPage ? "active" : "inactive")}
                        className={allFilters.totalPage == null ? allFilters.pages[allFilters.rangeSize - 1] < limitation ? "active" : "inactive" : allFilters.pages[allFilters.rangeSize - 1] < allFilters.totalPage ? "active" : "inactive"}
                        tabIndex="0"
                        aria-disabled="true"
                        aria-label="Page Suivante"
                        rel="next">
                        <span aria-hidden="true">
                            <PaginationNextArrow title="Les 10 pages suivantes" />
                        </span>
                        <span className='visually-hidden'>Les 10 pages suivantes</span>
                    </a>
                </li>
            </ul>
        </footer>
    )
}

