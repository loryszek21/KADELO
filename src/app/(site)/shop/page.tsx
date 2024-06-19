import Shop from "./shop";
import styles from "../contests/page.module.scss";
// import Button from "@/app/(site)/components/Form/Button/Button";
import P from "@/app/(site)/components/Ptag/Ptag";
import Htag from "@/app/(site)/components/Htag/Htag";
// import ProgressRing from "@/app/(site)/components/progress_ring/progress_ring";
import Link from "next/link";

// export const metadata: any = {
//     title: "Shop page",
// };

async function Shops() {
    const data: ShopPageProps[] = await fetch(
        "http://localhost:5000/shop",{
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
                    return <Shop key={item.course_id} {...item} />;
                })}
            </>
        </div>
    );

}


export default Shops;