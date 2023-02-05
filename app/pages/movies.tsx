import { FC } from "react"
import MovieList from "@/components/MovieList"
import MovieForm from "@/components/MovieForm"
import { NavBar } from "@/components/NavBar"

const Movies: FC = () => {
  return (<>
    <NavBar/>
    <MovieForm />
    <MovieList />
    </>
  )
}

export default Movies