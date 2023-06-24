import Sidebar from '@/components/SideBar'
import './globals.css'
import { Figtree } from 'next/font/google'
import SupabaseProvider from '@/providers/Supabaseprovider'
import UserProvider from '@/providers/Userprovider'
import ModalProvider from '@/providers/ModalProvider'
import Toastprovider from '@/providers/Toastprovider'
import getSongsUser from '@/actions/getSongsUser'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Dereck Spotify',
  description: 'Music app',
}
export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <Toastprovider/>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider/>
            <Sidebar songs={userSongs}> 
              {children}
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
