"use client";
import { useRef } from "react";
import Button from "./components/Form/Button/Button";

function App(): JSX.Element {
    return (
        <div>
            Home page
            <br />
            <br />
            <br />
            <Button appearance="ghost">ghost</Button>
            <Button appearance="primary">primary</Button>
        </div>
    );
}

export default App;
