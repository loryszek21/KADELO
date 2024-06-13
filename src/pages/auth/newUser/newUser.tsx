import Input from "@/app/(site)/components/Form/Input/Input";
import styles from "./newUser.module.scss";
import Button from "@/app/(site)/components/Form/Button/Button";
import { useRef } from "react";
import P from "@/app/(site)/components/Ptag/Ptag";
import { toast } from "react-toastify";
import { SignInProps } from "../signin.props";

export default function NewUser({
    className,
    props,
    setTab,
    router,
}: SignInProps): JSX.Element {
    const email = useRef<string>("");
    const password = useRef<string>("");
    const login = async (event: SubmitEvent) => {
        event.preventDefault();
        const res = await fetch("http://localhost:5000/user/insertUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email.current,
                password: password.current,
                name: name.current,
            }),
        })
            .then((res) => {
                if (res.status === 200) {
                    toast("Account created ", { type: "success" });
                    setTab(0);
                    return;
                } else {
                    return res.json();
                }
            })
            .then((e) => {
                console.error(e);
                toast(e?.message, { type: "error" });
            });
    };
    const name = useRef<string>("");

    return (
        <>
            <form className={styles.login_form} onSubmit={(e: any) => login(e)}>
                <P size="l" className={styles.title}>
                    Registration
                </P>
                <Input placeholder="" type="hidden" />
                <Input
                    placeholder="Name"
                    type="text"
                    onChange={(e) => (name.current = e.target.value)}
                />
                <Input
                    placeholder="Email"
                    type="email"
                    onChange={(e) => (email.current = e.target.value)}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => (password.current = e.target.value)}
                />
                <Button appearance="primary">Register</Button>
            </form>
            <section className={styles.login}>
                <P size="m">
                    Back to
                    <span onClick={() => setTab(0)} className={styles.reg_link}>
                        Login
                    </span>
                </P>
            </section>
        </>
    );
}
