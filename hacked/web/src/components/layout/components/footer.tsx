import { Link } from '@tanstack/react-router'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { useStatus } from '@/hooks/use-status'
import { useSystemConfig } from '@/hooks/use-system-config'
import { cn } from '@/lib/utils'


function LegalLinks() {
  const { t } = useTranslation()
  const { status } = useStatus()
  const items: { key: string; label: string; href: string }[] = []
  if (status?.user_agreement_enabled) {
    items.push({
      key: 'user-agreement',
      label: t('User Agreement'),
      href: '/user-agreement',
    })
  }
  if (status?.privacy_policy_enabled) {
    items.push({
      key: 'privacy-policy',
      label: t('Privacy Policy'),
      href: '/privacy-policy',
    })
  }
  if (items.length === 0) {
    return null
  }
  return (
    <>
      {items.map((item, index) => (
        <Fragment key={item.key}>
          {(index > 0) && <span aria-hidden='true' className='text-muted-foreground/30'>·</span>}
          <Link to={item.href} className='hover:text-foreground transition-colors duration-200'>{item.label}</Link>
        </Fragment>
      ))}
    </>
  )
}

export function Footer(props: { className?: string }) {
  const { t } = useTranslation()
  const { footerHtml } = useSystemConfig()
  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn('border-border/40 relative z-10 border-t', props.className)}>
      <div className='mx-auto max-w-6xl px-6 py-12 md:py-16'>
        <div className='border-border/30 mt-12 flex flex-col items-center justify-center gap-x-3 gap-y-2 border-t pt-6 sm:flex-row'>
          <div className='text-muted-foreground/40 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:justify-start'>
            <span>&copy; {currentYear} {footerHtml} {t('footer.defaultCopyright').replaceAll(/[\.。]/g,'')}</span>
            <LegalLinks />
          </div>
        </div>
      </div>
    </footer>
  )
}
