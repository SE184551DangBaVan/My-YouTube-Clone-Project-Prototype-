import axios from "axios"

const request = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3/",
    params: {
        key: "AIzaSyBdhJgCp1o4tjx_htd_nTVIPPQVjEaoZGE",//"AIzaSyBdhJgCp1o4tjx_htd_nTVIPPQVjEaoZGE",
    },
})

export default request