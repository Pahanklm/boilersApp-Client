import ParallaxBackground from "@/components/elements/ParallaxBackground/ParallaxBackground";
import Link from "next/link";

const Custom404 = () => {
    return (
        <>
            <nav>
                <div className="menu404">
                    <p className="website_name">Boilers</p>
                    <div className="menu_links">
                        <Link href='/dashboard' passHref legacyBehavior>
                            <a className="link">
                                about
                            </a>
                        </Link>
                        <Link href='/dashboard' passHref legacyBehavior>
                            <a className="link">
                                contacts
                            </a>
                        </Link>
                    </div>
                    <div className="menu_icon">
                        <span className="icon" />
                    </div>
                </div>
            </nav>
            <section className="wrapper404">
                <div className="container404">
                    <ParallaxBackground />
                    <div className="text">
                        <article>
                            <p>
                                Uh oh! Looks like you got lost. <br />
                                Go back to the homepage if you dare!
                            </p>
                            <Link href="/dashboard" passHref>
                                <button>i dare!</button>
                            </Link>
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Custom404;






