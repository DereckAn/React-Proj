import Sidebar from '@/components/SideBar'
import './globals.css'
import { Figtree } from 'next/font/google'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Dereck Spotify',
  description: 'Music app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Sidebar> 
          {children}
        </Sidebar>
       
        </body>
    </html>
  )
}
