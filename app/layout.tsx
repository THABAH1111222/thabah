import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'روبو ستور',
  description: 'إدارة اشتراكاتك بسهولة',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ margin: 0, padding: 0, background: '#0a0505' }}>
        {children}
      </body>
    </html>
  )
}
