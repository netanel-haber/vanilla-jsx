import App from './App';

const root = document.getElementById("root");
const remove = (e) => e.currentTarget.cleanup();

root.appendChild(
  <div>
    <App id="light" click={remove} />
    <App id="dark" darkMode click={remove} />
  </div>
)
