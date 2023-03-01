import { useRouter } from "next/router";
import Link from "next/link";

const FootballPitch = () => {
    const router = useRouter();
    console.log(router);
    return (
        <div>
            Football Pitch Page {router.query.foo}
            <Link href="/">
                Back to home
            </Link>
            <Link href="/football-pitch/dynamic">
                Go to dynamic
            </Link>
        </div>
    )
}

export default FootballPitch;