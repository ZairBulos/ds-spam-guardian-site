import { useEffect, useRef, useState } from 'preact/hooks'
import { Sun } from './icons/Sun'
import { Moon } from './icons/Moon'
import { System } from './icons/System'

const THEMES = [
  { name: 'light', icon: <Sun class="size-4" /> },
  { name: 'dark', icon: <Moon class="size-4" /> },
  { name: 'system', icon: <System class="size-4" /> },
] as const

type ThemeName = (typeof THEMES)[number]['name']

const ThemeToggle = () => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>(
    (localStorage.getItem('theme') as ThemeName) ?? 'system'
  )
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  const handleThemeClick = (name: ThemeName) => {
    setSelectedTheme(name)
    localStorage.setItem('theme', name)
    setIsOpen(false)

    const $html = document.documentElement

    if (name === 'system') {
      $html.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
    } else {
      $html.setAttribute('data-theme', name)
    }
  }

  const getThemeIcon = () => {
    if (selectedTheme === 'system') {
      return prefersDark ? (
        <Moon className="text-dark-svg-color" />
      ) : (
        <Sun className="text-light-svg-color" />
      )
    }
    return selectedTheme === 'dark' ? (
      <Moon className="text-dark-svg-color" />
    ) : (
      <Sun className="text-light-svg-color" />
    )
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <button
        className="border-light-button-border hover:bg-light-button-hover dark:bg-dark-button dark:hover:bg-dark-button-hover relative mb-1 cursor-pointer rounded-lg border p-2 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getThemeIcon()}
      </button>
      {isOpen && (
        <div ref={menuRef} className="absolute z-10 flex max-w-max flex-col rounded-lg border p-1">
          {THEMES.map(({ name, icon }) => (
            <div
              key={name}
              className="flex cursor-default items-center gap-x-2 px-2 py-1.5"
              onClick={() => handleThemeClick(name)}
            >
              {icon}
              {name}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ThemeToggle
