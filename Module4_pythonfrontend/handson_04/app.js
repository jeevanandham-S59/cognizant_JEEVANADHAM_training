const notifications =
document.querySelector(
"#notifications"
);

const loading =
document.querySelector(
"#loading"
);

const errorBox =
document.querySelector(
"#error-box"
);

const loadBtn =
document.querySelector(
"#load-btn"
);

/* Task 1 */

function fetchUser(id){

return fetch(
`https://jsonplaceholder.typicode.com/users/${id}`
)
.then(response =>
response.json()
)
.then(data => {
console.log(
"Promise User:",
data.name
);
});

}

fetchUser(1);

/* Async Await */

async function fetchUserAsync(id){

try{

const response =
await fetch(
`https://jsonplaceholder.typicode.com/users/${id}`
);

const data =
await response.json();

console.log(
"Async User:",
data.name
);

}
catch(error){

console.error(error);

}

}

fetchUserAsync(2);

/* Simulated Courses */

const courseData = [
{
id:1,
name:"Data Structures"
},
{
id:2,
name:"Database Systems"
}
];

function fetchAllCourses(){

return new Promise(
resolve => {

setTimeout(
() => resolve(courseData),
1000
);

}
);

}

async function loadCourses(){

loading.style.display =
"block";

const courses =
await fetchAllCourses();

console.log(courses);

loading.style.display =
"none";

}

loadCourses();

/* Promise.all */

Promise.all([
fetch(
"https://jsonplaceholder.typicode.com/users/1"
).then(r=>r.json()),

fetch(
"https://jsonplaceholder.typicode.com/users/2"
).then(r=>r.json())

])
.then(users=>{

console.log(
users[0].name,
users[1].name
);

});

/* Reusable Fetch */

async function apiFetch(url){

const response =
await fetch(url);

if(!response.ok){

throw new Error(
`HTTP Error:
${response.status}`
);

}

return response.json();

}

/* Render Notifications */

async function loadPosts(){

loading.style.display =
"block";

errorBox.innerHTML = "";

try{

const posts =
await apiFetch(
"https://jsonplaceholder.typicode.com/posts?_limit=10"
);

notifications.innerHTML = "";

posts.forEach(post => {

const div =
document.createElement("div");

div.className =
"card";

div.innerHTML = `
<h3>${post.title}</h3>
<p>${post.body}</p>
`;

notifications.appendChild(div);

});

}
catch(error){

errorBox.innerHTML = `
<p>${error.message}</p>
<button onclick="loadPosts()">
Retry
</button>
`;

}
finally{

loading.style.display =
"none";

}

}

loadBtn.addEventListener(
"click",
loadPosts
);

/* Axios */

axios.interceptors.request.use(
(config)=>{

console.log(
"API call started:",
config.url
);

return config;

}
);

async function loadAxiosPosts(){

try{

const response =
await axios.get(
"https://jsonplaceholder.typicode.com/posts",
{
params:{
userId:1
}
}
);

console.log(
"Axios Posts:",
response.data
);

}
catch(error){

console.error(error);

}

}

loadAxiosPosts();

/*
Fetch vs Axios

1. Fetch requires response.json()
   Axios auto parses JSON

2. Fetch does not throw for 404
   Axios throws automatically

3. Fetch is built into browser
   Axios is external library
*/