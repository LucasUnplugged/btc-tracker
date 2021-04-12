import * as React from 'react';
import Header from '../Header/Header';
import GlobalStyles from '../../shared/styles/GlobalStyles';
import Tracker from '../Tracker/Tracker';
import { CoinbaseDTO, PriceState } from '../../shared/models/models';

let isDemo = false;

export default function App() {
  const [price, setPrice] = React.useState<PriceState>();

  const getPrice = React.useCallback((): void => {
    fetch(isDemo ? 'response.json' : 'https://api.coinbase.com/v2/prices/BTC-USD/buy', {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    })
      .then((response: Response): Promise<CoinbaseDTO> => response.json())
      .then((source: CoinbaseDTO): void => {
        setPrice(
          (state?: PriceState): PriceState => {
            const rand = Math.random();
            const current = isDemo ? 58000 + rand * 4000 : parseFloat(source.data.amount);
            const previous = state?.current ?? current;
            return {
              current,
              delta: current - previous,
              previous,
            };
          }
        );
      });
  }, []);

  React.useEffect((): (() => void) => {
    const demoKeyHandler = (event: KeyboardEvent) => {
      if (event.key === 'e' && event.shiftKey && (event.ctrlKey || event.metaKey)) {
        console.log(isDemo ? 'Switching to live data' : 'Switching to mocked demo data');
        isDemo = !isDemo;
      }
    };
    window.addEventListener('keydown', demoKeyHandler);
    return (): void => {
      window.removeEventListener('keydown', demoKeyHandler);
    };
  }, []);

  // Initial price fetch
  React.useEffect((): void => {
    getPrice();
  }, [getPrice]);

  return (
    <main>
      <GlobalStyles />
      <Header />
      {price && <Tracker getPrice={getPrice} price={price} />}
    </main>
  );
}
