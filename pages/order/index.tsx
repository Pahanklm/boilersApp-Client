import Layout from "@/components/layout/Layout";
import useRedirectByUserCheck from "@/hooks/useRedirectByUserCheck";
import Head from "next/head";

function OrerdPage() {
    const { shouldLoadContent } = useRedirectByUserCheck()

    return (
        <>
            <Head>
                <title>Запчасти Для Бойлеров | {shouldLoadContent ? 'Оформелние Заказа' : ''}</title>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE-edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
            </Head>
            {shouldLoadContent && <Layout>
                <main>
                    <h1>order</h1>
                    <div className="overlay" />
                </main>
            </Layout>}
        </>
    );
}


export default OrerdPage