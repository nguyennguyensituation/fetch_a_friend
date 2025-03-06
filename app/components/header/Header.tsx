import styles from '../header/header.module.css';
import { showFavorites, logOut } from '@/app/utils/headerUtils';

export default function Header(props: {
  username: string,
  favoritesCount: number,
  setDisplayFaves: (display: boolean) => void,
  resetApp: () => void }) {
  const username = props.username;
  const usernameDisplay = <span className={styles.username}>{username}</span>;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Fetch a Friend</h1>
        <h3>A matchmaking tool to find four-legged friends</h3>
      </div>
    {username && 
      <nav className={styles.nav}>  
    
        <p className={styles.greeting}>Hello, {usernameDisplay}!</p>
        
        <button className={styles.signout}
        onClick={(e: React.MouseEvent) => {
          logOut(e, props.resetApp)
          }}>
          Sign out
        </button>

        <button className={styles.favorites}
          onClick={(e: React.MouseEvent) => {
            showFavorites(e, props.setDisplayFaves);
          }}>
          &#9829; Favorites: {props.favoritesCount}
        </button>

      </nav>}
  </header>
  );
}
