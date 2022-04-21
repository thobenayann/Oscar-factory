export type User = {
    logged?: boolean,
    id?: number,
    username?: string,
    email: string,
    password: string,
    token?: string,
    myFavorites: Array<number>
    // myFavorites: number[]
}

export type MovieResult = {
    Poster: string,
    Title: string,
    Type: string,
    Year: string,
    imdbID: string
}

export type MovieFromOMDB = MovieResult & {
    Director: string,
    Actors: string,
    Plot: string,
}

export type MovieFromOscar = {
    id: string,
    image: string,
    title: string,
    release_year: string,
    imdb_id?: string
}

export type Review = {
    id: number,
    user_id: number,
    movie_id: number,
    rating: number,
    content: string,
}

export type Category = {
    id: number,
    label: string,
}

export type Nullable<T> = T | null;