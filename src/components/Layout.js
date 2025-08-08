import Link from 'next/link';

import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.page}>
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.brand}>ESCAPEQUEST</Link>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.link}>HOME</Link>
                    <Link href="/about" className={styles.link}>ABOUT</Link>
                </nav>
            </div>
        </header>

        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
            © 2025 EscapeQuest Inc. All rights reserved.
        </footer>
    </div>
  );
}