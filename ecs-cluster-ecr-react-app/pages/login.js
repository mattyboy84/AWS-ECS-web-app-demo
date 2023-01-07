import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

import { useSession, signIn, signOut } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export default function Login() {

  const { data: session } = useSession()

  //if (loading) {
  //  return null;
  //}
  //
  if(session) {
    return (<>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>)
  }
  return (<>
    Not signed in <br/>
    <button onClick={() => signIn()}>Sign in</button>
  </>)
  //return (
  //  <>
  //  </>
  //)
}
