import axios from "axios";

const API=

axios.create({

baseURL:

"https://jsonplaceholder.typicode.com"

});

export const getCourses=()=>{

return API.get("/posts?_limit=5");

};