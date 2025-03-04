import styles from '../header/header.module.css';

function showFavorites(e: React.MouseEvent, 
  setDisplayFaves: (display: boolean) => void) {
    e.preventDefault();
    setDisplayFaves(true);
}

export default function Header(props: {
  username: string,
  favoritesCount: number,
  setDisplayFaves: (display: boolean) => void }) {
  const username = props.username;
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Fetch a Friend</h1>
        <h3>A matchmaking tool to find four-legged friends</h3>
      </div>
    {username && 
      <nav className={styles.nav}>  
        <h3 className={styles.greeting}>Hello, <span className={styles.username}>{username}</span>!</h3>
        <button className={styles.favorites} onClick={(e: React.MouseEvent) => {
          showFavorites(e, props.setDisplayFaves);
        }}>Favorite dogs: {props.favoritesCount}</button>
         <button className={styles.signout}>Sign out</button>
      </nav>}
  </header>
  );
}