import Header from '../Header/Header';
import GlobalStyles from '../../shared/styles/GlobalStyles';

export default function App() {
  return (
    <main className="App">
      <GlobalStyles />
      <Header />
      <section>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </section>
    </main>
  );
}
