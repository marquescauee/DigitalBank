export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex min-h-screen justify-between font-inter">
      {children}
      <div className="auth-asset" />
    </main>
  )
}
