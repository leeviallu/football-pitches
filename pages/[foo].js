import { useRouter } from "next/router"
import Head from 'next/head'

const DynamicRoute = () => {
    const router = useRouter();
    const query = router.query.foo;
    return(
        <>
            <Head>
                <title>{query}</title>
            </Head>
            <main>
                <div>Page {query}</div>
            </main>
        </>
    )

}

export default DynamicRoute;