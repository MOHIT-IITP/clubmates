"use client"
import { Moon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

const ModeToggle = () => {
  const { theme , setTheme} = useTheme();
  const [systemTheme , setSystemTheme] = useState<"light" | "dark">("light");

  useEffect(()=>{
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChanges = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    } 
     
    mediaQuery.addEventListener('change', handleChanges);

    return () => mediaQuery.removeEventListener('change', handleChanges) 

  }, [])
  const SWITCH = () => {
    switch(theme) {
      case "light": {
        setTheme("dark");
        return;
      }
      case "dark": {
        setTheme("light");
        return
      }
      case "system": {
        setTheme(systemTheme === 'light' ? 'dark': 'light')
      }
    }
  }
  return (
    <button onClick={SWITCH} className=' border-2 border-dashed p-6  rounded-full shadow-lg border-gray-400 flex items-center justify-center '>
      <MoonIcon size={28} className='rotate-0 text-gray-600  scale-100 transition-all duration-200 dark:rotate-90 dark:scale-0 absolute  ' />
      <SunIcon size={28} className=' text-white rotate-90 scale-0  transition-all duration-200 dark:rotate-0 dark:scale-100  absolute' />
    </button>
  )
}

export default ModeToggle