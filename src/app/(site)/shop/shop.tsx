"use client";
import Button from "@/app/(site)/components/Form/Button/Button";
import styles from "../contests/page.module.scss";
import P from "@/app/(site)/components/Ptag/Ptag";
import Htag from "@/app/(site)/components/Htag/Htag";
import ProgressRing from "@/app/(site)/components/progress_ring/progress_ring";
import Link from "next/link";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Shop(shop: ShopPageProps): JSX.Element {
    const router = useRouter();
    const session: any = useSession();
    if (session.status === "unauthenticated") {
        return <P size="m">You need to be logged in to see your courses</P>;
    }
    const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
        const response = await fetch(
            `http://localhost:5000/shop/${shop.course_id}?email=${session?.data?.user.email}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();
        console.log(data);
        router.push(data);
    };

    return (
        <div className={styles.contest}>
            <div className={styles.top_part}>
                <section className={styles.info}>
                    <Htag tag="h2">{shop.course_name}</Htag>
                    <P size="m">{shop.course_description}</P>
                </section>
            </div>
            <div className={styles.bottom_part}>
                {/* <Timestamp date={course.course_time_end} /> */}
                {shop.course_price == 0 ? (
                    <Button appearance="primary">Start</Button>
                ) : (
                    <Button appearance="primary" onClick={handleClick}>
                        Buy
                    </Button>
                )}
                {shop.course_price == 0 ? (
                    <P size="m">Free</P>
                ) : (
                    <P size="m">{shop.course_price} Zl</P>
                )}
            </div>
        </div>
    );
}
