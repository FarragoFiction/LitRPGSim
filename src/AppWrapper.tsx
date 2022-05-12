import { useEffect, useState } from "react";
import About from "./About";
import App from "./App";
import Birthday from "./Birthday";
import { ApocalypseScreen } from "./Screens/Apocalypse/ApocalypseScreen";
import { AtticSim, PathType } from "./Screens/Attic/AtticSim";
import { CCTVScreen } from "./Screens/Secrets/CCTV";
import { isNumeric, stringtoseed } from "./Utils/StringUtils";
import { getParameterByName } from "./Utils/URLUtils";
import { CrowSim } from "./Screens/Attic/CrowSim";
import { getRandomSeed } from "./Utils/NonSeededRandUtils";
/*
as simple as possible, handles the three main screens of "enter your birthday", 
"play the game", "jr rambles about dev log shit"
maybe an "about" page too
four then.
*/

export const BIRTHDAY = "BIRTHDAY";
export const ABOUT = "ABOUT";
export const APOCALYPSE = "APOCALYPSE";
export const GHOST = "GHOST";
export const PW = "PW";
export const TRUTH = "Truth";
export const LIE = "LIE";

//game mode is just "is there a seed";

function AppWrapper() {
  const [seed, setSeed] = useState<number>();


  useEffect(() => {
    if (!seed) {
      let initial_seed;
      let urlseed: string | number | null = getParameterByName("seed", null);
      if (urlseed) {
        if (!isNumeric(urlseed)) {
          initial_seed = stringtoseed(urlseed);
        } else {
          initial_seed = parseInt(urlseed);
        }
        setSeed(initial_seed);
      } else {
        setSeed(getRandomSeed());
      }
    }
  }, [seed, setSeed]);


  if (seed) {
    return (
      <App seed={seed} />
    )
  } else {
    return (
      <div>Loading Optimal Hydration...</div>
    )
  }
}

export default AppWrapper;

