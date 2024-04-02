import React from "react";
import {render} from "@testing-library/react";
import Joke from "./Joke";

test("render joke without crashing", () => {
    render(<Joke id="1" text="Joke" votes={1}/>);
})