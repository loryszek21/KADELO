'use client'
import { useRef } from 'react';
import Button from './components/Form/Button/Button';

function App(): JSX.Element {

    const text = useRef('');

    const handleClick = () => {
        fetch('http://localhost:5000/test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: JSON.stringify(text.current), type: '.js' })
        }).then(res => res.json()).then(data => console.log(JSON.parse(data.message)))
    }

    return (
        <div>
            Home page<br/><br/><br/>
            <textarea name="" id="" onChange={(e) => text.current = e.target.value}></textarea>Only js
            <Button appearance='ghost' onClick={handleClick}>ghost</Button>
        </div>
    )
}

export default App;
