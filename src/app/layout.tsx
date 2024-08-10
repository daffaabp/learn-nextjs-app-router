"use client";
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './navbar'
import { useState } from 'react'
import { usePathname } from 'next/navigation';


const inter = Inter({ subsets: ['latin'] });

const disableNavbar = ["/login", "/register"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, setState] = useState(0);
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* jika pathname saat ini ada di /login atau /register, maka navbar nya tidak akan ditampilkan */}
        {!disableNavbar.includes(pathname) && <Navbar />}
        {/* <div>Layout {state}</div> */}
        {/* <button onClick={() => setState(state + 1)}>Klik</button> */}
        {children}
      </body>
    </html>
  )
}
