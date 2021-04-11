import * as React from 'react';
import Header from '../Header/Header';
import GlobalStyles from '../../shared/styles/GlobalStyles';
import Tracker from '../Tracker/Tracker';
import { CoinbaseDTO, PriceState } from '../../shared/models/models';

export default function App() {
  const [price, setPrice] = React.useState<PriceState>();

  const getPrice = React.useCallback((): void => {
    fetch('response.json', {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    })
      .then((response: Response): Promise<CoinbaseDTO> => response.json())
      .then((source: CoinbaseDTO): void => {
        setPrice(
          (state?: PriceState): PriceState => {
            // const current =  parseFloat(source.data.amount);
            const rand = Math.random();
            const current = rand < 0.334 ? 50000 : rand > 0.666 ? 59000 : 55000;
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

  // Initial price fetch
  React.useEffect((): void => {
    getPrice();
  }, [getPrice]);

  return (
    <main className="App">
      <GlobalStyles />
      <Header />
      {price && <Tracker getPrice={getPrice} price={price} />}
    </main>
  );
}
