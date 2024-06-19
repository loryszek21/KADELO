'use client'
import Button from "@/app/(site)/components/Form/Button/Button";
import styles from "../contests/page.module.scss";
import P from "@/app/(site)/components/Ptag/Ptag";
import Htag from "@/app/(site)/components/Htag/Htag";
import ProgressRing from "@/app/(site)/components/progress_ring/progress_ring";
import Link from "next/link";
import { MouseEventHandler } from "react";

export default function Shop(shop: ShopPageProps): JSX.Element {

//     async function orderCourse(){
//         const req = await fetch("https://secure.snd.payu.com/api/v2_1/orders",{
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     notifyUrl: "https://your.eshop.com/notify",
//                     customerIp: "127.0.0.1",
//                     merchantPosId: "481726",
//                     description: "RTV market",
//                     currencyCode: "PLN",
//                     totalAmount: "21000",
//                     extOrderId: "2uikc6gjd99b4lxc75ip4k",
//                     buyer: {
//                         email: "john.doe@example.com",
//                         phone: "654111654",
//                         firstName: "John",
//                         lastName: "Doe",
//                         language: "pl"
//                     },
//                     products: [
//                         {
//                             name: "Wireless Mouse for Laptop",
//                             unitPrice: "15000",
//                             quantity: "1"
//                         },
//                         {
//                             name: "HDMI cable",
//                             unitPrice: "6000",
//                             quantity: "1"
//                         }
//                     ]
//                 })

//             });
//             const response = await req.json();
// console.log(response);

    

    
    return (
        // <Link
        //     href={
        //         shop.course_price == 0 ? `/contests/${shop.course_id}` : ""
        //     }
        // >
            <div className={styles.contest}>
                <div className={styles.top_part}>
                    <section className={styles.info}>
                        <Htag tag="h2">{shop.course_name}</Htag>
                        <P size="m">{shop.course_description}</P>
                    </section>
                    <section className={styles.progress_ring}>
                        {/* <ProgressRing */}
                            {/* start={shop.course_time_start.toString()} */}
                            {/* end={shop.course_time_end.toString()} */}
                            {/* task={5} */}
                            {/* completed={3} */}
                        {/* /> */}
                    </section>
                </div>
                <div className={styles.bottom_part}>
                    {/* <Timestamp date={course.course_time_end} /> */}
                    {shop.course_price == 0 ? (
                        <Button appearance="primary">Start</Button>
                    ) : (
                        <Button appearance="primary" >Buy</Button>
                    )}
                    {shop.course_price == 0 ? (
                        <P size="m">Free</P>
                    ) : (
                        <P size="m">{shop.course_price} $</P>
                    )}
                </div>
            </div>
        // </Link>
    );
}
