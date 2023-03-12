import { useRouter } from "next/router"
import Head from 'next/head'

const DynamicRoute = () => {
    const router = useRouter();
    const query = router.query.foo;
    return(
        <div>
            <Head>
                <title>{query}</title>
            </Head>
            <main>
                <div>Page {query}</div>
            </main>
        </div>
    )

}

export default DynamicRoute;