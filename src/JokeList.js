import React, {useState, useEffect} from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

/** List of jokes. */

function Jokelist({numJokesToGet = 5}) {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    async function getJokes() {
      try {
        let jokes = [];
        let seenJokes = new Set();
    
        while (jokes.length < numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let { ...joke } = res.data;
    
          if (!seenJokes.has(joke.id)) {
            seenJokes.add(joke.id);
            jokes.push({ ...joke, votes: 0 });
          } else {
            console.log("duplicate found!");
          }
        }

        setJokes(jokes);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    if (jokes.length === 0) {
      getJokes();
    }
  }, [numJokesToGet, jokes]);

  function generateNewJokes() {
    setIsLoading(true);
    setJokes([]);
  }
    
    
  function vote(id, delta) {
  setJokes(allJokes => (
    allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j)
      ))
    );
  }

  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    )
  }
  
  return (
    <div className="JokeList">
      <button
        className="JokeList-getmore"
        onClick={generateNewJokes}
      >
        Get New Jokes
      </button>
      {sortedJokes.map(j => (
        <Joke
          text={j.joke}
          key={j.id}
          id={j.id}
          votes={j.votes}
          vote={vote}
        />
      ))}
    </div>
  );
}  


export default Jokelist;
