import { courses } from "./data.js";

const courseGrid =
document.querySelector(".course-grid");

const searchInput =
document.querySelector("#search-courses");

const sortBtn =
document.querySelector("#sort-btn");

const totalCredits =
document.querySelector("#total-credits");

const selectedCourse =
document.querySelector("#selected-course");

/* ES6 Features */

const formattedCourses =
courses.map(
course =>
`${course.code} - ${course.name}
(${course.credits} credits)`
);

console.log(formattedCourses);

const creditCourses =
courses.filter(
course => course.credits >= 4
);

console.log(
"Courses >= 4 credits:",
creditCourses.length
);

const total =
courses.reduce(
(sum, course) =>
sum + course.credits,
0
);

console.log(
"Total Credits:",
total
);

/* Render Function */

function renderCourses(data){

    courseGrid.innerHTML = "";

    data.forEach(course => {

        const card =
        document.createElement("article");

        card.className =
        "course-card";

        card.dataset.id =
        course.id;

        card.innerHTML = `
            <h3>${course.name}</h3>
            <p>${course.code}</p>
            <p>${course.credits} Credits</p>
        `;

        courseGrid.appendChild(card);

    });

    totalCredits.textContent =
    `Total Credits: ${total}`;
}

renderCourses(courses);

/* Search */

searchInput.addEventListener(
"input",
(e)=>{

const searchTerm =
e.target.value.toLowerCase();

const filtered =
courses.filter(course =>
course.name
.toLowerCase()
.includes(searchTerm)
);

renderCourses(filtered);

}
);

/* Sort */

sortBtn.addEventListener(
"click",
()=>{

const sorted =
[...courses].sort(
(a,b)=>
b.credits-a.credits
);

renderCourses(sorted);

}
);

/* Event Delegation */

courseGrid.addEventListener(
"click",
(event)=>{

const card =
event.target.closest(
".course-card"
);

if(!card) return;

const id =
Number(card.dataset.id);

const course =
courses.find(
c => c.id === id
);

selectedCourse.innerHTML =
`
<h3>Selected Course</h3>
<p>Name: ${course.name}</p>
<p>Grade: ${course.grade}</p>
`;

}
);