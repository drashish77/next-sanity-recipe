import styles from '../styles/Home.module.css'
import Link from 'next/link'

const about = () => {
  return (
    <div className={styles.container}>
      <h2>About page</h2>
      <p>Here you will find all the recipes</p>
      <Link href='/'>
        <a>🔙 Home 🏠</a>
      </Link>
    </div>
  )
}

export default about
