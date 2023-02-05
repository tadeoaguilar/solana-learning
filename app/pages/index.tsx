import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import {Center, Spacer} from '@chakra-ui/react'
import styles from '@/styles/Home.module.css'
import { NavBar } from '@/components/NavBar'
import { Box, Stack } from '@chakra-ui/react'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.container}>
      
    <Head>
      <title>Buildoors</title>
      <meta name="The NFT Collection for Buildoors" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Box
      w="full"
      h="calc(100vh)"
      bgImage={"url(/home-background.svg)"}
      backgroundPosition="center"
    >
      <Stack w="full" h="calc(100vh)" justify="center">
        <NavBar></NavBar>

        <Spacer />

        <Center>
          <Box marginBottom={4} color="black">
            <a
              href="https://twitter.com/_buildspace"
              target="_blank"
              rel="noopener noreferrer"
            >
              built with @_buildspace
            </a>
          </Box>
        </Center>
      </Stack>
    </Box>
  </div>
   )
}
