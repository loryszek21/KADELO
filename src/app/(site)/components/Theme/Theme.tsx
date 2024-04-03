'use client'
import { useEffect, useState } from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import { useTheme } from 'next-themes';

export default function ThemeChange() {

    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return <BsFillSunFill />

    return (
        <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
            {resolvedTheme === 'dark' ? <BsFillSunFill /> : <BsFillMoonFill />}
        </button>
    )
}