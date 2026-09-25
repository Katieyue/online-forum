// console.log("Hello World!");

// const initialFacts = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     category: "technology",
//     votesInteresting: 24,
//     votesMindblowing: 9,
//     votesFalse: 4,
//     createdIn: 2021,
//   },
//   {
//     id: 2,
//     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
//     source:
//       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
//     category: "society",
//     votesInteresting: 11,
//     votesMindblowing: 2,
//     votesFalse: 0,
//     createdIn: 2019,
//   },
//   {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     category: "society",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015,
//   },
// ];

// Selecting DOM elements
const postBtn = document.querySelector(".btn-post");
const form = document.querySelector("form");
const factsList = document.querySelector(".facts-list");

console.dir(postBtn);

// Create DOM elements -- render facts in list
factsList.innerHTML = "";

// load data from supabase
loadFacts();
async function loadFacts() {
  // await -- pause code execution while fetching from api, only for funcs that return promises
  const res = await fetch(
    "https://qxddstqrosrvmfbmbktj.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4ZGRzdHFyb3Nydm1mYm1ia3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2NDcxNjUsImV4cCI6MjEwMjIyMzE2NX0.6Etm3VZu19i7H6H-ba9ovYI1oRQj9fkcT4jiZCJu_As",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4ZGRzdHFyb3Nydm1mYm1ia3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2NDcxNjUsImV4cCI6MjEwMjIyMzE2NX0.6Etm3VZu19i7H6H-ba9ovYI1oRQj9fkcT4jiZCJu_As",
      },
    },
  );
  const data = await res.json();
  // console.log(data);
  // const filteredData = data.filter((fact) => fact.category === "history");
  // createFactsList(filteredData);
  createFactsList(data);
}

function createFactsList(dataArray) {
  const htmlArr = dataArray.map(
    (fact) => `<li class="fact">
    <p>
        ${fact.text}
        <a
          class="source"
          href="${fact.source}"
          target="_blank"
        >(Source)</a>
    </p>
    <span class="tag" style="background-color: ${CATEGORIES.find((cat) => cat.name === fact.category).color}">
    ${fact.category}</span>
    
    </li>`,
  );
  // console.log(htmlArr);
  const joinedHTML = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", joinedHTML);
}

// factsList.insertAdjacentHTML("afterbegin", "<li>blah</li>");
// factsList.insertAdjacentHTML("afterbegin", "<li>blah blah</li>");

// Toggle form visibility
postBtn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    postBtn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    postBtn.textContent = "Share a Post";
  }
});

// console.log([7, 64, 6, -23, 11].filter((el) => el > 10)); // filter -- returns new array of all elements that satisfy
// console.log([7, 64, 6, -23, 11].find((el) => el > 10)); // find -- return first element that satisfies

const CATEGORIES = [
  { name: "technology", color: "#B5DCFE" },
  { name: "science", color: "#BDE3D4" },
  { name: "finance", color: "#f28c38" },
  { name: "society", color: "#FCE27B" },
  { name: "entertainment", color: "#FFB3BE" },
  { name: "health", color: "#8af2e6" },
  { name: "history", color: "#ffc79f" },
  { name: "news", color: "#a1a1f7" },
];

console.log(CATEGORIES.find((cat) => cat.name === "history").color);

const allCategories = CATEGORIES.map((el) => el.name);
console.log(allCategories.join(" ")); // join array into one string
