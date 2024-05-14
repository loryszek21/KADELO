"use client";
import styles from "./Profile.module.scss";
import { ProfileProps } from "./Profile.props";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { FaUserAlt, FaUserAltSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Htag from "../../Htag/Htag";
import P from "../../Ptag/Ptag";
import Button from "../../Form/Button/Button";

export default function Profile({
    className,
    ...props
}: ProfileProps): JSX.Element {
    const { data: session } = useSession();
    const [opened, setOpened] = useState(false);

    return (
        <>
            {session ? (
                <button onClick={() => setOpened(!opened)}>
                    <FaUserAlt size={20} />
                </button>
            ) : (
                <>
                    <button
                        onClick={() => {
                            signIn(), setOpened(false);
                        }}
                    >
                        <FaUserAltSlash size={20} />
                    </button>
                </>
            )}
            <motion.div
                animate={opened ? { x: 0 } : { x: "100%" }}
                className={styles.closeBg}
                onClick={() => setOpened(false)}
            ></motion.div>

            <motion.div
                className={styles.setting}
                initial={{ opacity: 0, x: "100%" }}
                animate={
                    opened ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }
                }
            >
                <motion.button
                    className={styles.close}
                    onClick={() => setOpened(false)}
                    whileHover={{ rotate: 180 }}
                >
                    <IoMdClose />
                </motion.button>
                <div className={styles.info}>
                    <Htag tag="h3">Profile settings</Htag>
                    {/* <Image></Image> */}
                    <P size="m">{session?.user?.name}</P>
                    <P size="m">{session?.user?.email}</P>
                </div>
                <Button
                    appearance="primary"
                    className={styles.signout}
                    onClick={() => {
                        signOut(), setOpened(false);
                    }}
                >
                    Sign Out
                </Button>
            </motion.div>
        </>
    );
}
