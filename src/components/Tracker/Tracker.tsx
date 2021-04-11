import * as React from 'react';
import { PriceState } from '../../shared/models/models';
import TrackerHeader from '../TrackerHeader/TrackerHeader';

const HEARTBEAT_DELAY = 3750; // 16 per minute
// const HEARTBEAT_DELAY = 1750;
let interval: ReturnType<typeof setInterval>;

interface TrackerProps {
  getPrice: () => void;
  price: PriceState;
}

export default function Tracker(props: TrackerProps) {
  const { getPrice, price } = props;
  const [heartbeat, setHeartbeat] = React.useState<number>(new Date().getTime());

  // Live update heartbeat
  React.useEffect((): (() => void) => {
    // Start the heartbeat when this component mounts
    setHeartbeat(new Date().getTime());
    interval = setInterval((): void => {
      setHeartbeat(new Date().getTime());
    }, HEARTBEAT_DELAY);
    // And stop it when this component is unmounting
    return (): void => clearInterval(interval);
  }, []);

  React.useEffect(getPrice, [heartbeat]);

  return (
    <article>
      <TrackerHeader price={price} />
    </article>
  );
}
