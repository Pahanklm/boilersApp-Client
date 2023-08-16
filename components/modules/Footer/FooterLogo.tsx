import Link from "next/link";
import styles from '@/styles/footer/index.module.scss'


const FooterLogo = () => {
    return (
        <div className={styles.footer__top__item}>
            <Link href="/dashboard" passHref legacyBehavior>
                <a className={styles.footer__top__item__logo}>
                    <img src="/img/footer/logo_footer.svg" alt="foter-logo" />
                    <span className={styles.footer__top__item__logo__text}>Детали для
                        газовых котлов</span>
                </a>
            </Link>
        </div>
    );
}

export default FooterLogo;