import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import BreadCrum from "../components/BreadCrum";
import ShowPage from "../components/ShowPage";
function ShowTourism(props) {
    const [show, setShow] = useState({})
    const params = useParams()
    const Cid = params.id
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${Cid}`, {
            params: {

                api_key: "9b743af1d4fde1d65af33c40dcccce87"
            }
        })
            .then((movie) => setShow(movie.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <div className="container">
                <div className="row" style={{ height: '100px' }}></div>
                <BreadCrum value2={show.title} ele={show} />

                <ShowPage image={show.poster_path} title={show.title} overview={show.overview} reviow={show.vote_average} />

            </div>


        </>
    )
}
export default ShowTourism