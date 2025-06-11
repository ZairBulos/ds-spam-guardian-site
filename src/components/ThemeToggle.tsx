import { useEffect, useRef, useState } from 'preact/hooks'
import { Sun } from './icons/Sun'
import { Moon } from './icons/Moon'
import { System } from './icons/System'
import { useTranslations } from '@/i18n/utils'
import type { languages } from '@/i18n/ui'

const THEMES = [
  { name: 'light', icon: <Sun class="size-4" /> },
  { name: 'dark', icon: <Moon class="size-4" /> },
  { name: 'system', icon: <System class="size-4" /> },
] as const

type ThemeName = (typeof THEMES)[number]['name']

type LanguageName = keyof typeof languages

interface ThemeToggleProps {
  lang: LanguageName
}

const ThemeToggle = ({ lang }: ThemeToggleProps) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>('system')
  const [prefersDark, setPrefersDark] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const t = useTranslations(lang)

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
      return prefersDark ? <Moon className="text-dark-text" /> : <Sun className="text-light-text" />
    }
    return selectedTheme === 'dark' ? (
      <Moon className="text-dark-text" />
    ) : (
      <Sun className="text-light-text" />
    )
  }

  useEffect(() => {
    setSelectedTheme(localStorage.getItem('theme') as ThemeName)

    const isPreferDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setPrefersDark(isPreferDark)

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
        className="border-light-border dark:border-dark-border hover:bg-light-secondary-hover dark:bg-dark-primary dark:hover:bg-dark-secondary-hover relative cursor-pointer rounded-md border p-2 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getThemeIcon()}
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="border-light-border dark:border-dark-border bg-light-primary dark:bg-dark-secondary absolute right-0 z-10 mt-1 flex min-w-32 flex-col rounded-md border p-1"
        >
          {THEMES.map(({ name, icon }) => (
            <div
              key={name}
              className="text-light-text dark:text-dark-text hover:bg-light-secondary-hover dark:hover:bg-dark-secondary-hover flex cursor-default items-center gap-x-4 rounded-md px-2 py-1.5"
              onClick={() => handleThemeClick(name)}
            >
              {icon}
              {t(name)}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ThemeToggle
