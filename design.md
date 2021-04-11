# Zest.ai Assigment

Design and implement a frontend to make use of this endpoint to track the price of BTC in USD from the time the browser is opened, until the time it is closed.

The page should display the latest price, a graph of where the price has been over time, and a directional arrow indicating the current trend (price is going up over time, or down). We intended to show this off, so make it sexy!

## API Endpoint

https://api.coinbase.com/v2/prices/BTC-USD/buy

## Instructions

1. Prepare a presentation outlining your architecture, solution and trade-offs.

- Feel free to have fun with this!

2. Load your code up to a git repo and share it with us.
3. Host the project somewhere

- Github Pages?

4. Be prepared to answer questions about how/why you did things.

You will present your solution to several members of various Zest teams. Most will be engineers, in various disciplines (BE, ML, etc). Some will have strong ideas about UI/UX. A few will have no technical skills at all.

**Be prepared to cater to all audiences.**

After the presentation, we will have a short Q&A / working session with the group. There is a hard-stop at the 30-minute mark. We advise allocating maximum 10 minutes for the presentation, 5-10 minutes for the demo, and the rest for questions.

---

# Architecture

<App as main>
  <Header as header>
    - Logo
    - Color mode toggle (light/dark)
  <Tracker as article>
    {
      heartbeat
      price
      previousPrice
    }
    - Heartbeat
    - Get price data
    <TrackerHeader as header>
      (
        price
        previousPrice
      )
      - Price
      - Delta arrow
    <Graph as figure>
      (
        price
      )
      {
        data
      }
      - Price over time
      - Max
      - Min
      - Average line
      - (histogram?? Can scroll and change the scale??)
      <figcaption>
        - Graph title
