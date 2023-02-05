import {FC,useState} from 'react'
import { Movie } from '@/models/Movies'
import * as Web3 from '@solana/web3.js'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button
} from '@chakra-ui/react'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'
const MovieForm:FC = () => {
  const [title,setTitle] = useState('')
  const [message,setMessage] = useState('')
  const [rating,setRating] = useState(5)
  const {connection} = useConnection();
  
  const [tx, setTX] = useState('')
    const {publicKey, sendTransaction} = useWallet();
  const handleSubmit = (event: any) => {
    event.preventDefault()
    const movie = new Movie(title,rating,message)
    console.log(movie)
    movieTransaction(movie)
}
  const movieTransaction = async(movie: Movie) => {
    if (!publicKey) {
      alert('Please connect your wallet')
      return 
    }
    const buffer = movie.serialize()
    const transaction = new Web3.Transaction;
    const [pda,bump] = await Web3.PublicKey.findProgramAddressSync([
        publicKey.toBuffer(), new TextEncoder().encode(movie.title)] ,
        new Web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID))
    console.log(`Bump: ${bump}`)  
    const instruction = new Web3.TransactionInstruction({
      keys: [{
        pubkey: publicKey,
        isSigner: true,
        isWritable: false
      },
      {
        pubkey: pda,
        isSigner: false,
        isWritable: true
      },
      {
        pubkey: Web3.SystemProgram.programId,
        isSigner: false,
        isWritable: false
      }

    
    ],
    data: buffer,
    programId: new Web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)  

    })
    transaction.add(instruction)
    try {
      let txid = await sendTransaction(transaction,connection)
      console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
    } catch (error) {
      console.log(error)
      alert(JSON.stringify(error))
    }
  }
  return (
    <form onSubmit={handleSubmit}>
    <FormControl  m={3}>
      <FormLabel>Movie Title </FormLabel>
      <Input type='text' 
            onChange={event => setTitle(event.currentTarget.value)}
      />
      <FormHelperText>The movie you want to review.</FormHelperText>
      <FormLabel>Review </FormLabel>
      <Input 
          type='text' 
          maxLength={256}
          onChange={event => setMessage(event.currentTarget.value)}
           />
      <FormHelperText>Enter a review for that movie you love</FormHelperText>
      <FormLabel>Review </FormLabel>
      <NumberInput 
          allowMouseWheel 
          defaultValue={5} 
          min={1} max={5}
          onChange={(value) => setRating(parseInt(value))}
          >
        <NumberInputField 
          
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Button m={3} colorScheme='blue' type='submit' >Submit</Button>
    </FormControl>
    </form>
  )
}

export default MovieForm