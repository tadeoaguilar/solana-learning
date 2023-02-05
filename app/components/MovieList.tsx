import { Card } from "./Card";
import { FC, useEffect, useState } from "react";
import { Movie } from "@/models/Movies";
import * as web3 from '@solana/web3.js'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { isPropertyAccessOrQualifiedName } from "typescript";
import { McLaren } from "@next/font/google";
import { FormControl, Grid, GridItem, SimpleGrid ,Switch} from "@chakra-ui/react";


const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'


let myMoviesList: Movie[] = []
const MovieList = () => {
    const {publicKey,connected} = useWallet();//  new web3.PublicKey('fPFu8BbSZ39zB3A44EbyzKAUy6GmWRoZW6Q5Xa1JJM4');

    const [movies,setMovies] = useState<Movie[]>([])    
    const [myMessages,setmyMessages] = useState<boolean>(false)
    const {connection} = useConnection()

    
    
     const Connected = () => {
      return (
        <>  
            {movies.length}
            <Switch onChange={myMessageHandler}>      
            </Switch> 
            
            <SimpleGrid  templateColumns='repeat(3, 33vw)'>       
            {            
                movies.filter((movie)=> movie.description.length>0).map((movie,i) =>{
                    return(
                        <>
                                <Card key={i} movie={movie} /> 
            
                        </>
                    )
                })
            }
            </SimpleGrid>        
        
        </>
      
      )}

    
    
    const pda = async (title: string) =>{ 
        return (await  web3.PublicKey.findProgramAddressSync(
                [publicKey? publicKey.toBuffer(): new Buffer(''), 
                 new TextEncoder().encode(title)
                ], 
                new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)) )}
    const myMessageHandler = () => {
        setmyMessages(!myMessages)
       // console.log(myMessages)
    }



    
    useEffect(()=> {
        connection.getProgramAccounts(new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID))
        .then(async(accounts) =>{
             // console.log(accounts)
                const movies: Movie[] = accounts.reduce((accum:Movie[],{pubkey,account}) => {
                const movie = Movie.deserialize(account.data)
                if (!movie) {return accum}

                myMoviesList.length =0

                pda(movie.title).then(async (data: [web3.PublicKey,number])=> {
                if (data[0].toString() === pubkey.toString()){
                   // console.log(movie)
                    myMoviesList.push(movie)
                }})

            return (myMessages ? myMoviesList : [...accum,movie])
            },[]) 
            
            
            setMovies(movies)
        })
        

    },[connected, myMessages])
  return (
    
    <>
       {
        connected ? <Connected /> : <h1>Connect your wallet </h1>

       } 
       
       
    </>

  )
}

export default MovieList

