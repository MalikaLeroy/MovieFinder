

import styles from '../styles/modules/Header.module.scss';
import Logo from '../public/logo_moviefinder.svg';
import SearchIcon from '../public/searchicon.svg';

export default function Header() {
      return (
      <header className={styles.content}>
        <h1 aria-hidden="true">
          <span className="visually-hidden">Moviefinder</span>
          <Logo title="logo Moviefinder"/>
        </h1>
          <label>
            <div>
              <input 
                type="search" 
                autoComplete="off" 
                placeholder="Rechercher un film"
              />
            </div>
            <span>
              <SearchIcon/>
            </span>
          </label>
      </header>
      )
}