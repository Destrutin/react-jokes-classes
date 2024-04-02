import React from "react";
import {render} from "@testing-library/react";
import JokeList from "./JokeList";

test("renders jokelist without crashing", () => {
    render(<JokeList/>);
})