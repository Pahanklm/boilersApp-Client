import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";
import ContactsPage from "@/components/templates/ContactsPage/ContactsPage";
import useRedirectByUserCheck from "@/hooks/useRedirectByUserCheck";
import Head from "next/head";
import { useCallback } from "react";

function Contacts() {
    const { shouldLoadContent } = useRedirectByUserCheck()

    const getDefaultTextGenerator = useCallback(() => 'Контакты', [])
    const getTextGenerator = useCallback((param: string) => ({}[param]), [])


    return (
        <>
            <Head>
                <title>Запчасти Для Бойлеров | {shouldLoadContent ? 'Контакты' : ''}</title>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE-edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
            </Head>
            {shouldLoadContent && (
                <Layout>
                    <main>
                        <Breadcrumbs
                            getDefaultTextGenerator={getDefaultTextGenerator}
                            getTextGenerator={getTextGenerator}
                        />
                        <ContactsPage />
                        <div className="overlay" />
                    </main>
                </Layout>
            )}
        </>
    );
}


export default Contacts