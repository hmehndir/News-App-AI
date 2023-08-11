import axios from "axios";

export default async function getNews(category="General") {
    const API = "81988d9cbb924abd8e60d956ff8a074d";
    const API_EndPoint = `http://newsapi.org/v2/top-headlines?country=in&category=${category}`; 

    return await axios.get(`${API_EndPoint}&apiKey=${API}`).then((res) =>{
        return res.data.articles;
    }).catch((err) =>{
        return [];
    })
}
