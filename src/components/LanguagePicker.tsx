import { useEffect, useRef, useState } from 'preact/hooks'
import { languages as LANGUAGES } from '@/i18n/ui'
import { useTranslations } from '@/i18n/utils'

type LanguageName = keyof typeof LANGUAGES

interface LanguagePickerProps {
  lang: LanguageName
}

const LanguagePicker = ({ lang }: LanguagePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const t = useTranslations(lang)

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
        className="border-light-border dark:border-dark-border hover:bg-light-secondary-hover dark:bg-dark-primary dark:hover:bg-dark-secondary-hover relative min-w-24 cursor-pointer rounded-md border p-2 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-light-text dark:text-dark-text">{lang.toUpperCase()}</span>
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="border-light-border dark:border-dark-border bg-light-primary dark:bg-dark-secondary absolute right-0 z-10 mt-1 flex min-w-48 flex-col rounded-md border p-1"
        >
          <div className="text-light-text dark:text-dark-text px-2 py-1.5">
            {t('selectLanguage')}
          </div>
          <hr className="text-light-text dark:text-dark-text -mx-1 my-1" />
          {Object.entries(LANGUAGES).map(([lang, label]) => (
            <a
              key={lang}
              href={`/${lang}/`}
              className="text-light-text dark:text-dark-text hover:bg-light-secondary-hover dark:hover:bg-dark-secondary-hover flex cursor-default rounded-md px-2 py-1.5"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}

export default LanguagePicker
