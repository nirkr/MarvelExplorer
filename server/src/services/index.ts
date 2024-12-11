import { ActorResponse } from "../types";
import  axios, { AxiosRequestConfig } from "axios";

const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchMoviesPerActor = async (actorNames: string[]): Promise<ActorResponse[]> => {
    // TODO: pagination
    const moviesPromises = actorNames.map(async actorName => {

        const axiosRequest: AxiosRequestConfig = {
            url: `${BASE_URL}/search/person?query=${actorName}`,
            headers: {
                Authorization: `Bearer ${process.env.TMDB_TOKEN}`
            }
        }
        const res = await axios(axiosRequest)
        return res.data
    })
    const results = await Promise.all(moviesPromises)
    const filteredResults = results.filter(result => result !== null) as ActorResponse[];

    return filteredResults; // Return the array of actor responses
}



// https://api.themoviedb.org/3/person/{person_id}/movie_credits
