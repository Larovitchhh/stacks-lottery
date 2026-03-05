export const metadata = {
  title: 'Stacks Lottery',
  description: 'Built for Stacks Builder Rewards',
}

export default function RootLayout({
  children,
}: {
  children: any
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0f172a' }}>{children}</body>
    </html>
  )
}
