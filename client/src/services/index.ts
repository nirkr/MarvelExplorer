import axios from "axios"
import {ActorMovies} from '../types'

const BASE_URL = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`

export const fetchMoviesPerActor = async(actorName: string): Promise<ActorMovies> => {
    const response = await axios.get(`${BASE_URL}/moviesPerActor?q=${actorName}`)
    return response.data
}