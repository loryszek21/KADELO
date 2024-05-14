"use client";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";

type CodeEditorProps = {
    code: string;
    setCode: any;
};

export default function CodeEditor({
    code,
    setCode,
}: CodeEditorProps): JSX.Element {
    const { resolvedTheme } = useTheme();

    return (
        <Editor
            height="100%"
            value={code}
            onChange={(evn: any) => setCode(evn)}
            defaultLanguage="javascript"
            theme={resolvedTheme == "dark" ? "vs-dark" : "vs-light"}
        />
    );
}
