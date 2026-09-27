import "./style.css";
import { useState } from "react";

const initialFacts = [
  {
    id: 1,
    text: "UC Irvine places eighth among nation's best public universities",
    source:
      "https://news.uci.edu/2026/09/22/uc-irvine-places-eighth-among-nations-best-public-universities/://opensource.fb.com/",
    category: "News",
    upvote: 24,
    votes_interesting: 9,
    votes_false: 4,
    createdIn: 2026,
  },
  {
    id: 2,
    text: "A new Mesa Court community center has finished construction ahead of academic year",
    source:
      "https://newuniversity.org/2026/09/25/mesa-court-community-center-construction-complete-ahead-of-academic-year/",
    category: "Housing",
    upvote: 11,
    votes_interesting: 2,
    votes_false: 0,
    createdIn: 2019,
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
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState(initialFacts); // temp

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      {showForm ? (
        <NewPostForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main>
        <CategoryFilter />
        <FactList facts={facts} />
      </main>
    </>
  );
}

function Header({ showForm, setShowForm }) {
  const appTitle = "University Forum";
  return (
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
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share a post"}
      </button>
    </header>
  );
}

// const CATEGORIES = [
//   { name: "technology", color: "#B5DCFE" },
//   { name: "science", color: "#BDE3D4" },
//   { name: "finance", color: "#f28c38" },
//   { name: "society", color: "#FCE27B" },
//   { name: "entertainment", color: "#FFB3BE" },
//   { name: "health", color: "#8af2e6" },
//   { name: "history", color: "#ffc79f" },
//   { name: "news", color: "#a1a1f7" },
// ];

const CATEGORIES = [
  { name: "Classes", color: "#B5DCFE" },
  { name: "Clubs", color: "#BDE3D4" },
  { name: "News", color: "#f28c38" },
  { name: "Events", color: "#FCE27B" },
  { name: "History", color: "#FFB3BE" },
  { name: "Food", color: "#8af2e6" },
  { name: "Housing", color: "#ffc79f" },
  { name: "Opportunities", color: "#a1a1f7" },
];

function isValidUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function NewPostForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  function handleSubmit(e) {
    // 1. Prevent browser reload on submit
    e.preventDefault();
    console.log(text, source, category);

    // 2. Check if data is valid, if so create new fact
    if (text && isValidUrl(source) && category && textLength <= 200)
      console.log("there is data");

    // 3. Create new fact object
    const newFact = {
      id: Math.round(Math.random() * 10000000),
      text, // text: text
      source, // source: source
      category, // category: category
      upvote: 0,
      votes_interesting: 0,
      votes_false: 0,
      createdIn: new Date().getFullYear(),
    };

    // 4. Add new fact to UI, add fact to state
    setFacts((facts) => [newFact, ...facts]);

    // 5. Reset input fields (back to empty)
    setText("");
    setSource("");
    setCategory("");
    // 6. Close the form
    setShowForm(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - text.length}</span>
      <input
        value={source}
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="large-btn">Post</button>
    </form>
  );
}

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

function FactList({ facts }) {
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} /> // creating fact instances
        ))}
      </ul>
      <p>There are {facts.length} posts in the database. Add your own!</p>
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
