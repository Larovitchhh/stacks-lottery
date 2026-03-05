export const metadata = {
  title: 'Stacks Lottery',
  description: 'Participate in the Stacks Builder Rewards',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
