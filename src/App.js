import "./style.css";
import { useState } from "react";

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    upvote: 24,
    votes_interesting: 9,
    votes_false: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    upvote: 11,
    votes_interesting: 2,
    votes_false: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    upvote: 8,
    votes_interesting: 3,
    votes_false: 1,
    createdIn: 2015,
  },
];

function Counter() {
  const [count, setCount] = useState(0); // destructure
  return (
    <div>
      <span style={{ fontSize: "40px" }}>{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  );
}

function App() {
  // 1) define state variable
  const [showForm, setShowForm] = useState(false);

  const appTitle = "Anteater Tidbits";

  return (
    <>
      {/* HEADER */}
      <header>
        <div className="logo">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2013%2F07%2F12%2F18%2F55%2Fthinking-153993_1280.png&f=1&nofb=1&ipt=f2ed3e7ec1949433ed8f00e99377043cd55ac0aca53b822917c42b141a9f5a00"
            height="68"
            alt="Text bubble logo"
          />
          <h1>{appTitle}</h1>
        </div>
        <button
          className="large-btn btn-post"
          // update state variable
          onClick={() => setShowForm((show) => !show)}
        >
          Share a post
        </button>
      </header>

      {/* 2) use state variable */}
      {showForm ? <NewPostForm /> : null}

      <main>
        <CategoryFilter />
        <FactList />
      </main>
    </>
  );
}

function NewPostForm() {
  return <form>Fact form</form>;
}

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

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li>
          <button className="btn-all">All</button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn-category"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList() {
  const facts = initialFacts; // temp
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} /> // creating fact instances
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

function Fact({ fact }) {
  // const { factObj } = props;
  return (
    <li className="fact">
      <p>
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>

      <div className="reaction-buttons">
        <button>👍 {fact.upvote}</button>
        <button>🤯 {fact.votes_interesting}</button>
        <button>⛔️ {fact.votes_false}</button>
      </div>
    </li>
  );
}

export default App;
