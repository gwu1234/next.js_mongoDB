import Head from 'next/head'
import styles from '../styles/home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home Work</title>
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>
            Home Work
        </h3>

        <div className={styles.grid}>
          <a href="/filter" className={styles.card}>
            <h3>Selecting Characters &rarr;</h3>
            <p>Listing Filtered Rick and Morty Characters</p>
          </a>
          <a href="/character" className={styles.card}>
            <h3>All Characters &rarr;</h3>
            <p>Listing all Rick and Morty Characters</p>
          </a>
          <a href="/character" className={styles.card}>
            <h3>Management &rarr;</h3>
            <p>Managing Rick and Morty Characters</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
          from Guoping Wu
      </footer>
    </div>
  )
}
