
import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/modules/MovieCard.module.scss';


export default function MovieCard({ movies, originalSize, width, height }) {
    const getYear = (date) => {
        const year = ""
        if (typeof date === 'string') {
            const myArray = date.split("-");
            year = myArray[0];
        }
        return year
    }
    const [src, setSrc] = useState(`https://image.tmdb.org/t/p/w${originalSize}${movies.poster_path}`)
    return (
        <div className={styles.movieCard}>
            <Image
                src={src}
                width={width}
                height={height}
                layout={'fixed'}
                alt={`Affiche du film "${movies.title}"`}
                placeholder="blur"
                blurDataURL={src}
                onError={() => setSrc('/no-image.png')}
                quality={80}
            />
            <div>
                <h3>{movies.title}</h3>
                <p>{getYear(movies.release_date)}</p>
            </div>
        </div>
    )
}
