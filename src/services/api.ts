import axios from "axios";

// json-server --watch db.json
export const api = axios.create({
    baseURL: "https://api.softsy.io/api-educacional-recebedor"
})

export const viaCEP = axios.create({
    baseURL: "https://viacep.com.br/ws"
})


// json-server --watch db.json
export const apiDev = axios.create({
    baseURL: "http://10.40.110.2:8080/api-educacional-recebedor"
})

