
import styles from '../styles/modules/BestMovies.module.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import 'swiper/css';
import "swiper/css/navigation";
import MovieCard from './MovieCard';
import LoaderError from './LoaderError';
import useWindowSize from "../components/useWindowSize";



export default function BestMovies({ topRatedData, topRatedError }) {
  const windowSize = useWindowSize();
  return (
    <section className={styles.content}>
      <h2>Les 10 meilleurs films</h2>
      {topRatedError ? <LoaderError type={'error'}>Oups, le top 10 n'est actuellement pas disponible</LoaderError>
        : !topRatedData ? <LoaderError type={'loader'} />
          :
          <>
            {windowSize.width > 991 &&
            <div id="js-prev1" role="button" className="swiper-button-prev"><span className='visually-hidden'>Voir le le film précédent</span></div>
          }
            <Swiper
              slidesPerView={windowSize.width < 992 ? "auto" : 4}
              spaceBetween={windowSize.width < 768 ? 20 : windowSize.width < 992 ? 105 : 0}
              freeMode={true}
              className={styles.swiperCustom}
              navigation={windowSize.width < 992 ? "" : { prevEl: '#js-prev1', nextEl: '#js-next1' }}
              modules={!windowSize.width < 992 ? [Navigation, Autoplay] : [Autoplay]}
              autoplay={{delay: 4000,disableOnInteraction: false}}
            >
              {topRatedData.results.map(movies =>
                <SwiperSlide key={movies.id} className={styles.swiperSlideCustom} >
                  <MovieCard
                    originalSize={windowSize.width < 768 ? 92 : 154}
                    width={windowSize.width < 768 ? 86 : 138}
                    height={windowSize.width < 768 ? 129 : 207}
                    movies={movies}
                    key={movies.id}
                  />
                </SwiperSlide>
              )}
            </Swiper>
            {windowSize.width > 991 &&
            <div id="js-next1" role="button" className="swiper-button-next"><span className='visually-hidden'>Voir le le film suivant</span></div>
            }
            </>
      }
    </section>
  )
}
