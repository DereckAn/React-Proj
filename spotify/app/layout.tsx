import Sidebar from '@/components/SideBar'
import './globals.css'
import { Figtree } from 'next/font/google'
import SupabaseProvider from '@/providers/Supabaseprovider'
import UserProvider from '@/providers/Userprovider'

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
        <SupabaseProvider>
          <UserProvider>
            <Sidebar> 
              {children}
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
