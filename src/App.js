import "./style.css";

function App() {
  return (
    <header>
      <div className="logo">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2013%2F07%2F12%2F18%2F55%2Fthinking-153993_1280.png&f=1&nofb=1&ipt=f2ed3e7ec1949433ed8f00e99377043cd55ac0aca53b822917c42b141a9f5a00"
          height="68"
          alt="Text bubble logo"
        />
        <h1>Anteater Tidbits</h1>
      </div>
      <button className="large-btn btn-post">Share a post</button>
    </header>
  );
}

export default App;
