import { useParams } from "next/navigation";
import Contest from "./contest";
import styles from "./page.module.scss";
// import { useSession } from "next-auth/react";



async function Contests() {
    // const { data: session, status } = useSession();

    const data: CoursePageProps[] = await fetch(
        
        `http://localhost:5000/courses/`,
        {
            cache: "no-cache",
        }
    )
        .then((res) => res.json())
        .catch((error) => {
            console.error("Error:", error);
        });

    return (
        <div className={styles.main}>
            <>
                {data?.map((item, i: number) => {
                    return <Contest key={item.course_id} {...item} />;
                })}
            </>
        </div>
    );
}

export default Contests;
