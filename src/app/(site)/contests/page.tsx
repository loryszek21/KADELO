import Contest from "./contest";
import styles from "./page.module.scss";
import { getServerSession } from "next-auth";
import P from "../components/Ptag/Ptag";
import { signIn } from "next-auth/react";

async function Contests() {
    const session = await getServerSession();

    if (session === null) {
        return <P size="m">You need to be logged in to see your courses</P>;
    }

    const data: CoursePageProps[] = await fetch(
        `http://localhost:5000/courses?email=${session?.user?.email}`,
        {
            cache: "no-cache",
        }
    )
        .then((res) => res.json())
        .catch((error) => {
            console.error("Error:", error);
        });

    console.log(data);

    return (
        <div className={styles.main}>
            <>
                {data.length > 0 ? (
                    data?.map((item, i: number) => {
                        return <Contest key={item.course_id} {...item} />;
                    })
                ) : (
                    <P size="m">
                        You don&apos;t have any courses yet go to shop to buy it
                    </P>
                )}
            </>
        </div>
    );
}

export default Contests;
