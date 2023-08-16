import Accordion from '@/components/elements/Accordion/Accordion'
import MarkerSvg from '@/components/elements/MarkerSvg/MarkerSvg'
import PhoneSvg from '@/components/elements/PhoneSvg/PhoneSvg'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/footer/index.module.scss'
import Link from 'next/link'
import CompanyContent from './CompanyContent'
import FooterLogo from './FooterLogo'
import OnlineStoreContent from './OnlineStoreContent'

const Footer = () => {
    const isMedia750 = useMediaQuery(750)
    const isMedia500 = useMediaQuery(500)

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <div className={styles.footer__top}>
                    {!isMedia750 && <FooterLogo />}
                    <div className={styles.footer__top__inner}>
                        <div className={styles.footer__top__item}>
                            {!isMedia500 && (
                                <>
                                    <h3 className={styles.footer__top__item__title}>
                                        Интернет-магазин
                                    </h3>
                                    <OnlineStoreContent />
                                </>
                            )}
                            {isMedia500 && (
                                <Accordion
                                    title="Интернет-магазин"
                                    titleClass={styles.footer__top__item__title}
                                    arrowOpenClass={styles.open}
                                >
                                    <OnlineStoreContent />
                                    <div style={{ height: 17 }} />
                                </Accordion>
                            )}
                        </div>
                        <div className={styles.footer__top__item}>
                            {!isMedia500 && (
                                <>
                                    <h3 className={styles.footer__top__item__title}>Компания</h3>
                                    <CompanyContent />
                                </>
                            )}
                            {isMedia500 && (
                                <Accordion
                                    title="Компания"
                                    titleClass={styles.footer__top__item__title}
                                    arrowOpenClass={styles.open}
                                >
                                    <CompanyContent />
                                    <div style={{ height: 17 }} />
                                </Accordion>
                            )}
                        </div>
                    </div>
                    <div className={styles.footer__top__item}>
                        <h3 className={styles.footer__top__item__title}>Контакты</h3>
                        <ul
                            className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}
                        >
                            <li className={styles.footer__top__item__list__item}>
                                <Link href="/contacts" passHref legacyBehavior>
                                    <a className={styles.footer__top__item__list__item__link}>
                                        <span>Наш адрес:</span>
                                        <span>г. Киев, ул. ... д....</span>
                                        <span>
                                            <MarkerSvg />
                                        </span>
                                    </a>
                                </Link>
                            </li>
                            <li className={styles.footer__top__item__list__item}>
                                <a
                                    href="tel:+780955555555"
                                    className={styles.footer__top__item__list__item__link}
                                >
                                    <span>Наш контактный телефон:</span>
                                    <span>+7(8095) 555-55-55</span>
                                    <span>
                                        <PhoneSvg />
                                    </span>
                                </a>
                            </li>
                            <li className={styles.footer__top__item__list__item}>
                                <a
                                    href="mailto:info@zapchasti.com.ru"
                                    className={styles.footer__top__item__list__item__link}
                                >
                                    <span>E-mail:</span>
                                    <span>info@zapchasti.com.ua</span>
                                    <span>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.footer__bottom}>
                    <div className={styles.footer__bottom__block}>
                        <div className={styles.footer__bottom__block__left}>
                            <h3 className={styles.footer__bottom__block__title}>
                                Мы принимаем к оплате:
                            </h3>
                            <ul className={styles.footer__bottom__block__pay}>
                                <li className={styles.footer__bottom__block__pay__item}>
                                    <img src="/img/footer/Apay.png" alt="apple-pay" />
                                </li>
                                <li className={styles.footer__bottom__block__pay__item}>
                                    <img src="/img/footer/gpay.png" alt="google-pay" />
                                </li>
                                <li className={styles.footer__bottom__block__pay__item}>
                                    <img src="/img/footer/mastercard.png" alt="master-card" />
                                </li>
                                <li className={styles.footer__bottom__block__pay__item}>
                                    <img src="/img/footer/visa.png" alt="visa" />
                                </li>
                            </ul>
                        </div>
                        <div className={styles.footer__bottom__block__right}>
                            <h3 className={styles.footer__bottom__block__title}>
                                Мы в соцсети:
                            </h3>
                            <ul className={styles.footer__bottom__block__social}>
                                <li className={styles.footer__bottom__block__social__item}>
                                    <a
                                        href="#"
                                        className={styles.footer__bottom__block__social__item_vk}
                                    />
                                </li>
                                <li className={styles.footer__bottom__block__social__item}>
                                    <a
                                        href="#"
                                        className={styles.footer__bottom__block__social__item_fb}
                                    />
                                </li>
                                <li className={styles.footer__bottom__block__social__item}>
                                    <a
                                        href="#"
                                        className={styles.footer__bottom__block__social__item_inst}
                                    />
                                </li>
                                <li className={styles.footer__bottom__block__social__item}>
                                    <a
                                        href="#"
                                        className={styles.footer__bottom__block__social__item_ytb}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                    {isMedia750 && <FooterLogo />}
                    <div className={styles.footer__bottom__block}>
                        <p className={styles.footer__bottom__block__copyright}>
                            © «Детали для газовых котлов» 2023.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer