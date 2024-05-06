'use client'
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';

type CodeEditorProps = {
    code: string,
    setCode: any
}

export default function CodeEditor({code, setCode}: CodeEditorProps): JSX.Element{

    const { resolvedTheme } = useTheme();
   
    function handleEditorDidMount(editor: any, monaco: any) {
        console.log('onMount: the editor instance:', editor);
        console.log('onMount: the monaco instance:', monaco);
    }
    
    function handleEditorWillMount(monaco: any) {
        console.log('beforeMount: the monaco instance:', monaco);
    }
    
    function handleEditorValidation(markers: any) {
        // model markers
        // markers.forEach(marker => console.log('onValidate:', marker.message));
    }

    return(
        <Editor 
            height="100%"
            value={code}
            onChange={(evn:any) => setCode(evn)}
            defaultLanguage="javascript" 
            theme={resolvedTheme == "dark" ? 'vs-dark': 'vs-light'}
            onMount={handleEditorDidMount}
            beforeMount={handleEditorWillMount}
            onValidate={handleEditorValidation}
        />
        )

}