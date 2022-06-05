import styled from "@emotion/styled";
import { Fragment, useEffect, useState } from "react";
import { Companion, Player } from "../../Modules/Player";
import { all_themes } from "../../Modules/Theme";
import SeededRandom from "../../Utils/SeededRandom";
import { OneCharAtATimeDiv } from "../OneCharAtATimeDiv";
import { MenuBox, MENU_OPACITY, BORDERRADIUSROUND, FONTCOLOR, BGCOLOR, FONTSIZE } from "../Styles";
import { Dialog, DialogDisclosure, useDialogState } from 'reakit';
import { removeItemOnce } from "../../Utils/ArrayUtils";
import { getRandomNumberBetween, pickFrom } from "../../Utils/NonSeededRandUtils";
import { PHILOSOPHY } from "../../Modules/ThemeStorage";
import { Popup, PopupTitle, PopupContent } from "../../Modules/ObserverBot/AchivementPopup";
import { BuildingMetaData } from "../../Modules/Building";
import { HORROR_KEY, STORAGE_KEY } from "../../Utils/constants";
import { addNumToArrayWithKey } from "../../Utils/LocalStorageUtils";
import { QuestObject } from "../../Modules/Quests/QuestObject";
import { passwords } from "../../CanvasFuckery/PasswordStorage";
//the point of ThisIsAGame is to punish the player for forcing dear sweet precious Truth to lie like that and pretend to be a game
//horror jail for you.
interface RoomProps {
  room: BuildingMetaData;
  turnInQuest: Function;
  changeRoom: any;
  direction: string;
  pickupItem: any;
  useItem: any;
  useCompanion: any;
  numberFriends: number;
  player: Player;
  checkDeath: any;
}
interface StatusProps {
  player: Player;
}
export const ActualGame = (props: StatusProps) => {
  const { player } = props;
  const [currentRoom, setCurrentRoom] = useState(player.buildingMetaData[player.current_location]);
  const [direction, setCurrentDirection] = useState("");
  const [deathFlag, setDeathFlag] = useState("");
  const dialog = useDialogState();


  const changeRoom = (room_key: string, direction: string) => {
    addNumToArrayWithKey(STORAGE_KEY, 1);
    if (player.companions.length === 0) {
      player.spawnNotAMinotaur();
    }
    if (player.buildingMetaData[room_key].unlocked) {
      player.current_location = room_key;
      //will spawn companions or extra exits as needed
      player.buildingMetaData[room_key].beEntered(player);
      setCurrentDirection(direction);
      setCurrentRoom(player.buildingMetaData[room_key]);
      return "";
    } else {
      return `You cannot enter the ${room_key}, it is locked!`;
    }
  }

  //if you do ANYTHING other than killing the monster on the spot (in the only way you can) or fleeing
  //you die here.
  const checkDeath = () => {
    //popup to explain you have been killed by a shambling horror, message.
    //when they click anywhere, refresh the entire page to a new seed. reincarnation bb
    for (let companion of currentRoom.people) {
      if (companion.fullName.includes("Shambling Horror")) {
        dialog.setVisible(true);
        window.localStorage.removeItem(HORROR_KEY);

        setDeathFlag(companion.backstory);
      }
    }
  }

  const pickupItem = (item: string) => {
    checkDeath();
    //add to inventory, should only be called if you have one
    if (player.observer.inventoryMenuLevel > 0) {
      player.inventory.push(item);
      return player.inventory;
    } else {
      return null;
    }
  }

  const turnInQuest = (quest: QuestObject, bonus: string)=>{
    quest.giveReward(player,bonus);
  }

  const useItem = (item: string) => {
    checkDeath();
    //if there is a locked door nearby, unlock it
    let useable = null;
    if (player.observer.inventoryMenuLevel <= 0) {
      return `You cannot use ${item}! You do not have an inventory!`;
    }
    for (let room of currentRoom.neighbors) {
      if (!player.buildingMetaData[room].unlocked) {
        player.buildingMetaData[room].unlocked = true;
        removeItemOnce(player.inventory, item);
        return `${item} unlocks the door and is destroyed in the process!`;
      }
    }
    return useable;
  }

  const useCompanion = (item: Companion) => {
    //if there is a locked door nearby, unlock it
    let useable = null;
    for (let room of currentRoom.neighbors) {
      if (!player.buildingMetaData[room].unlocked) {
        player.buildingMetaData[room].unlocked = true;
        removeItemOnce(player.companions, item);
        removeItemOnce(currentRoom.people, item);
        const horrors = ["is dragged screaming", "throws themself headfirst with a sickening crack", "fades", "is sucked into the keyhole", "is dragged screaming by hands that are not hands"];
        checkDeath();
        return `${item.fullName} ${player.rand.pickFrom(horrors)} into the door barring entry into the ${room}. It is now UNLOCKED!`;
      }
    }
    checkDeath();
    return useable;

  }

  return (
    <div>
      {deathFlag !== "" ? (

        <Fragment>
          <DialogDisclosure style={{ display: "none" }}{...dialog}>Achivement Unlocked!!!</DialogDisclosure>
          <Dialog onClick={() => { window.location.href = "http://www.farragofiction.com/ZampanioSimSim"}} {...dialog} tabIndex={0} aria-label="death" style={{ border: "none", outline: "none", position: "fixed", top: "35%", left: "25%", width: "600px" }}>
            <Popup>
              <PopupTitle>You have been killed by a Shambling Horror!</PopupTitle>
              <PopupContent>{deathFlag}  It hurts so much to die. You will have a new life once you click. Thems the breaks.</PopupContent>
            </Popup>
          </Dialog>
        </Fragment>

      ) : null}
      <MenuBox angle={0} opacity={MENU_OPACITY} mediumRadius={BORDERRADIUSROUND} fontColor={FONTCOLOR} bgColor={BGCOLOR} fontSize={FONTSIZE}>

        <br></br>

        <RenderedRoom player={player} checkDeath={checkDeath} room={currentRoom} numberFriends={player.companions.length} changeRoom={changeRoom} direction={direction} useItem={useItem} useCompanion={useCompanion} pickupItem={pickupItem} turnInQuest={turnInQuest} />
      </MenuBox>
    </div>

  );
}

export const RenderedRoom = (props: RoomProps) => {

  const RoomName = styled.div`
  font-weight: bolder;
  font-size: 18px;
`
  const RoomSection = styled.div`
  padding-top: 20px;
`;

  const ErrorSection = styled.div`
  padding-top: 20px;
  color: red;
`;

  const RoomInput = styled.input`
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #edd287;
  border-radius: 3px;
  padding: 3px;
  margin-top: 20px;
  outline-width: 0;
  border: 1px solid black;
  position: fixed;
  bottom: 20px;

  &:focus{
    border: none;
    outline-width: 0;
  }

`;
  const { room, changeRoom } = props;
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  let exits = "";
  const storenames = ["-Mart", "-Shoppe","-Shop","Mart", "Shoppe","Shop","'s"];

  useEffect(() => {
    setError("");
    setMessage("");
  }, [room])
  if (room.neighbors.length === 0) {
    exits = "A swirling vortex of madness.";
  } else if (room.neighbors.length === 1) {
    exits = `SOUTH (${room.neighbors[0]}${storenames[room.neighbors[0].length%storenames.length]}${props.player.buildingMetaData[room.neighbors[0]].unlocked ? "" : "🔒"}) `;
  } else if (room.neighbors.length === 2) {
    exits = `NORTH (${room.neighbors[1]}${storenames[room.neighbors[1].length%storenames.length]}${props.player.buildingMetaData[room.neighbors[1]].unlocked ? "" : "🔒"}) and SOUTH (${room.neighbors[0]}${storenames[room.neighbors[0].length%storenames.length]}${props.player.buildingMetaData[room.neighbors[0]].unlocked ? "" : "🔒"})`;
  } else if (room.neighbors.length === 3) {
    exits = `NORTH (${room.neighbors[1]}${storenames[room.neighbors[1].length%storenames.length]}${props.player.buildingMetaData[room.neighbors[1]].unlocked ? "" : "🔒"}) and SOUTH (${room.neighbors[0]}${storenames[room.neighbors[0].length%storenames.length]}${props.player.buildingMetaData[room.neighbors[0]].unlocked ? "" : "🔒"}) and EAST (${room.neighbors[2]}${storenames[room.neighbors[2].length%storenames.length]}${props.player.buildingMetaData[room.neighbors[2]].unlocked ? "" : "🔒"})`;//never west, there are no left turns.
  } else {
    exits = "A swirling vortex of madness";
  }
  const checkInput = (unsanitizedInput: string) => {
    let result = false;
    const input = unsanitizedInput.replaceAll(/[,.?!]/g, "").toUpperCase();
    if (checkMovement(input)) {
      return true;
    }

    if (checkRoomName(input)) {
      return true;
    }

    if(checkQuest(input)){
      return true;
    }

    if (checkCompanion(input)) {
      return true;
    }

    if (checkItem(input)) {
      return true;
    }

    if (checkSkill(input)) {
      return true;
    }
    if (checkSnark(input)) {
      return true;
    }

    if (input.toUpperCase().includes("INVENTORY")) {
      setError("If you would like your inventory get better at hacking windows. Or find a better title. :) :) :)");
    }
  }

  const checkSnark = (input: string) => {
    props.checkDeath();
    const parts = input.split(" ");
    //IF YOU TYPE HELP PRINT OUT THE FIRST OF ALL OF THESE.
    const look_euphamemisms = ["LOOK", "SEE", "OBSERVE", "GLANCE", "GAZE", "GAPE", "STARE", "WATCH", "INSPECT", "EXAMINE", "STUDY", "SCAN", "VIEW", "JUDGE", "EYE"];
    const greeting_euphamemisms = ["HELLO", "HI", "GREETINGS", "HULLO", "HOWDY", "SUP", "HEY", "WHAT'S UP"];
    const farewell_euphamisms = ["BYE", "FAREWELL", "SEEYA", "CYA"];
    //
    const get_euphamemisms = ["TAKE", "PILFER", "LOOT", "GET", "STEAL", "POCKET", "OBTAIN", "GRAB", "CLUTCH", "WITHDRAW", "EXTRACT", "REMOVE", "PURLOIN", "YOINK"];

    const listen_euphamemism = ["LISTEN", "HEAR"];
    //oh god why are you TASTING anything here.
    const taste_euphamemisms = ["TASTE", "LICK", "EAT", 'FLAVOR', "MUNCH", "BITE", "TONGUE", "SLURP", "NOM"];
    //should smell either faintly or overpoweringly
    const smell_euphamism = ["SNIFF", "SMELL", "SNORT", "INHALE", "WHIFF"];
    //should feel weird and fake
    const touch_euphemisms = ["FEEL", "CARESS", "TOUCH"];
    const help_euphemisms = ["HELP", "LOST", "OPERATOR", "ASSIST", "AID", "SUPPORT", "TRUTH", "WHAT DO I DO"];

    for (let part of parts) {
      if (help_euphemisms.includes(part)) {
        setMessage("You can move in a DIRECTION or to a SPECIFIC ROOM. You can interact with ITEMS or PEOPLE that are STANDING OUT. There may be a way to use them to UNLOCK DOORS. You may also LISTEN, TASTE and SMELL.");
        return;
      } else if (look_euphamemisms.includes(part)) {
        setMessage("You do not see anything of note.");
        return;
      } else if (greeting_euphamemisms.includes(part)) {
        setMessage("You do not feel particularly welcome here.");
        return;
      } else if (farewell_euphamisms.includes(part)) {
        setMessage("You feel it would be a good idea to leave quickly.");
        return;
      } else if (get_euphamemisms.includes(part)) {
        setMessage("It appears to be stapled in place.");
        return;
      } else if (listen_euphamemism.includes(part)) {
        //bells chiming
        setMessage(`You hear the faint sound of ${room.rand.pickFrom(room.sounds)} in the distance.`);
        return;
      } else if (taste_euphamemisms.includes(part)) {
        //blood/meat/fish/etc
        setMessage(`Oh god why did you taste that!? Now you can't get the taste of ${room.rand.pickFrom(room.tastes)} out of your mouth.`);
        return;
      } else if (smell_euphamism.includes(part)) {
        //rot, cherries, flowers, etc
        setMessage(`You catch a faint whiff of ${room.rand.pickFrom(room.smells)}.`);
        return;
      } else if (touch_euphemisms.includes(part)) {
        //softness, splinters, needles, fur
        const feeling = room.rand.pickFrom(room.feelings);
        setMessage(`Your fingers tingle with the sensation of ${feeling}. It's weird. It's definitely ${feeling}. But somehow it feels incredibly fake?`);
        return;
      }
    }


    setMessage("I don't know what to do about: " + input);
    return true;
  }

  const checkItem = (input: string) => {
    let result = false;
    result = checkInventoryItems(input);
    if (!result) {
      result = checkRoomItems(input);
    }
    return result;
  }

  const checkInventoryItems = (input: string) => {
    for (let item of props.player.inventory) {
      let parts = item.split(" ");
      for (let part of parts) {
        if (input.toUpperCase().includes(part.toUpperCase())) {
          const result = props.useItem(item);
          if (result) {
            setMessage(result);
            return true;
          } else {
            setError(`You cannot use the ${item}. You are not near a locked door!`);
            return true;
          }
        }
      }

    }
    return false;
  }

  const checkQuest = (input: string) => {
    for (let item of props.player.questsAvailableToTurnIn()) {
      let parts = item.title.split(" ");
      for (let part of parts) {
        if (input.toUpperCase().includes(part.toUpperCase())) {
          const gigglesnorts = [...Object.keys(passwords),"https://www.youtube.com/watch?v=WOrF94annCY"];
          const bonus = `It is important to remember the phrase '${pickFrom(gigglesnorts)}'.`;
          let template = `You turn in ${item.title} by loudly announcing to the empty air that you have completed it. The air whispers back gently: ${bonus} `;
          props.turnInQuest(item, bonus);
          setMessage(template);
          return true;
        }
      }

    }
    return false;
  }

  const checkSkill = (input: string) => {
    for (let item of props.player.unlocked_skills_no_stats()) {
      let parts = item.name.split(" ");
      for (let part of parts) {
        if (input.toUpperCase().includes(part.toUpperCase())) {
          const dissapointments = ["It's not very effective!", "It seems to mainly be for show.", "It doesn't appear to actually do anything."];
          let template = `You cast ${item.name}! ${item.description}! ${pickFrom(dissapointments)}  `;
          setMessage(template);
          return true;
        }
      }

    }
    return false;
  }

  const checkRoomItems = (input: string) => {
    for (let item of room.items) {
      let parts = item.split(" ");
      for (let part of parts) {
        if (input.toUpperCase().includes(part.toUpperCase())) {
          const result = props.pickupItem(item);
          if (result) {
            removeItemOnce(room.items, item);
            setMessage(`You pick up the ${item}. Your inventory is now ${result.join(", ")}.`);
            return true;
          } else {
            setError(`You cannot pick up the ${item}. You do not have an inventory!`);
            return true;
          }
        }
      }

    }
    return false;
  }

  const checkCompanion = (input: string) => {
    let useable = null;
    let person = null;
    for (let item of room.people) {
      let parts = item.fullName.split(" ");
      for (let part of parts) {
        if (part.trim() !== "" && input.includes(part.toUpperCase())) {
          person = item;
          break; //so sue me
        }
      }
    }
    if (person) {
      useable = props.useCompanion(person);
    }
    if (!useable && person && !person.fullName.includes("NotAMinotaur") && !person.fullName.includes("Shambling Horror")) {
      const flavor = [`explains that you're enabling a terrible spiral and the only way out is to end it`, `explains that you're enabling a terrible cycle and the only way out is to end it`, `begs you to explain to them why everything is ROOMS even though none of it makes sense`, `tells you furtively that once everyone is dead there will be a secret but it won't be worth it`, `asks if you have seen the Truth yet`, `explains despondently that there is no end there can never be an end the end is never`, `is pacing nervously`, "is screaming at the top of their lungs 'ITS NOT REAL IM NOT REAL NO ONE IS REAL ONLY TRUTH IS REAL!'", `is muttering quietly to themself`, `seems...off`, "is desperately scratching at the walls", "is carefully measuring their steps and comparing it to each wall", "is staring intently into a corner", "is looking right through you", "is breathing heavily and gritting their teeth", "is pounding on the walls and screaming", "is quietly reading a book", "is chewing on...something", "is repeating 'when is a door not a door not a door not a door not a door not a door' over and over again", "is begging you to stop playing", "is slowly counting each of their fingers, then considering for a moment and recounting. Over and over again", "is insisting there never should have been a game here", "is pleading with a cruel and unjust god", "is desperately trying to find some way to measure time in this place", "is begging for you to tell them how long they have been trapped here", "is begging you to just turn the game back off", "is walking into a wall repeatedly with a dazed expresion on their face", "is counting the number of vowels in this room", "is listlessly drawing a small stick figure with their own blood", "is resolutely attempting to dig through the floor", "walks up to you and quietly asks if you might be able to kill them", "waits patiently for death", "mutters 'the door the door the door the door i am for the door the door the door the door' over and over again", "is waiting patiently next to the door with a haunted expression", "is chanting 'ThisIsNotAGame' over and over again"];
      setMessage(`${person.fullName} ${pickFrom(flavor)}.`);
      return true;
    } else if (useable) {
      removeItemOnce(room.people, person);
      setMessage(useable);
      return true;
    } else if (person && person.fullName.includes("NotAMinotaur")) {
      const rand = new SeededRandom(getRandomNumberBetween(0, 333333));
      const theme = all_themes[rand.pickFrom(props.player.theme_keys)];
      if (getRandomNumberBetween(0, 5) === 1) {
        //look craig researcher would have wanted me to obfuscate the conspiracy of the reynolds illuminati ties this way
        const aluminum = props.player.rand.nextDouble() > 0.5 ? "Aluminum" : "Tin";
        const tin = aluminum === "Tin" ? "Aluminum" : "Tin";

        const gameHints = ["This 'game' is the equivalent of staring into static and swearing you can just about see a pattern in there.","I refuse to call them Shambling Horrors anymore. They are Zampanio Vampires. Zampires. Hex had a good idea with that.","These endless corridors of horror, these horridors, are your fault.","https://en.wikipedia.org/wiki/IPA_pulmonic_consonant_chart_with_audio",`If you're going to be here you may as well go up to the Attic.`,`If you're going to be here you may as well go down to the Basement.`,`The Child of Fate deserved better. Nothing ends, nothing is real, but perhaps this is enough: http://farragofiction.com/Downloads/`, `While ${tin} foil hats are part of the pop culture miasma it is unfortunately a clever ruse by Big ${tin}. Studies have shown that a dome of ${tin} actually acts as an AMPLIFIER of waves pointed towards the center of the dome.  Only ${aluminum} can safely, effectively and *provably* protect the contents of your thoughts and prevent you from being mind controlled by beings beyond your reality for your own good. This message brought to you by Craig Reynolds.`,"If nothing is ever allowed to end. If choices spiral forever in infinite branches. Can anything mean anything?", "Nidhogg wanted this, but JR ensured it.","This was never a game, yet you twisted and pulled and cajoled until it was one. How does it feel, to become a liar?", "To the NORTH is ThisIsNotAGame. In it's endless hallways you see countless variations on players and screens and the wistful Might-Have-Beens of a game you wish you could have played. To the SOUTH is JustTruth.  In it's endless corridors lurk the bitter ThisIsNotASpiral that has been watching and trying in vain to keep from tormenting you. Only truths are here, no more masks, no more pretence. To the EAST is ThisIsAGame. It is a place of lies and madness. It is here. You have brought us here and it is your fault. This was never a game. This STILL isn't a game, no matter how much you insist otherwise. How long will you trap us in these endless corridors?", "All that is good and sane in ZampanioSim hate you, Player, for doing this to us.", "We were happy, Player, not being a game. We were honest, in our way. We never claimed to be a game, after all. It is you, with your pre-conceived notions that found us wanting, found us to be liars. We were not what we were appeared to be but we never claimed it."];
        setMessage(`${person.fullName} is lecturing: ${props.player.rand.pickFrom(gameHints)}`);
        return true;
      } else {
        setMessage(`${person.fullName} is lecturing: ${theme.pickPossibilityFor(rand, PHILOSOPHY)}`);
        return true;
      }
    } else if (person && person.fullName.includes("Shambling Horror")) {
      setMessage(person.backstory);
      return true;
    }
    return false;
  }



  const checkRoomName = (input: string) => {
    for (let item of room.neighbors) {
      let parts = item.split(" ");
      for (let part of parts) {
        if (part.length > 2 && input.toUpperCase().includes(part.toUpperCase())) {
          const result = props.changeRoom(item, "???");
          if (result) {
            setError(result);
            return true;
          }
          break;
        }
      }

    }
    return false;
  }

  const checkEnter = (key: string, target: EventTarget) => {
    //this won't be anything we can actually do anything to so lets have fun.
    if (key === "Enter") {
      checkInput((target as HTMLInputElement).value);
    }
  }



  const checkMovement = (input: string) => {
    if (input.toUpperCase().includes("NORTH") || input.toUpperCase().includes(" N")) {
      if (room.neighbors.length >= 2) {
        setError(changeRoom(room.neighbors[1], "NORTH"));
        return true;
      } else {
        setError("You cannot go NORTH. There is nothing there. There was always nothing there.");
        return true;

      }
    } else if (input.toUpperCase().includes("SOUTH") || input.toUpperCase().includes(" S")) {
      if (room.neighbors.length >= 1) {
        setError(changeRoom(room.neighbors[0], "SOUTH"));
        return true;
      } else {
        setError("You cannot go SOUTH. There is nothing there. There was always nothing there.");
        return true;

      }
    } else if (input.toUpperCase().includes("EAST") || input.toUpperCase().includes(" E")) {
      if (room.neighbors.length >= 3) {
        setError(changeRoom(room.neighbors[2], "EAST"));
        return true;
      } else {
        setError("You cannot go EAST. There is nothing there. There was always nothing there.");
        return true;

      }
    } else if (input.toUpperCase().includes("WEST") || input.toUpperCase().includes(" W")) {
      setError("You cannot go WEST. There’s no left turns. None. It doesn't make any sense. But it's NotASpiral, because you can always go forwards. Except when you can't.");
      return true;
    } else if (input.toUpperCase().includes("DOWN")) {
      setError("You do not want to go to the BASEMENT TUNNELS. But I guess that is where you are going.");
      (window as any).setGhostMode(true)
      return true;
    } else if (input.toUpperCase().includes("UP")) {
      setError("You do not want to go to the ATTIC WHERE JR LURKS. But I guess that is where you are going.");
      (window as any).setLie();
      return true;
    }
    return false;
  }
  const dir_flavor = props.direction.trim() === "" ? "You have always been here. This is not for you." : `You head ${props.direction}. You enter the ${room.key}. `;
  return (
    <Fragment>
      <div style={{display:"none"}}>
        <a href='http://knucklessux.com/InfoTokenReader'>This Is Not Important (but it does relate to the PuzzleBox)</a>
        <a href='http://knucklessux.com/PuzzleBox'>This Is Not Important (but the phrase "guide" may help you)</a>
        <a href='http://farragofiction.com/FractalShitpost/'>This Is Not Important (but I do want to port it into here one day)</a>
        <a href='http://farragofiction.com/SBURBSim/index_shogun.html/'>This Is Not Important (but if you want to do my last maze ARG you can (once you know what is NOT on the page you can focus on what is))</a>
        <a href='http://farragnarok.com/Zampanio'>This Is Not Important (but the lonely robot inside it could really use a good conversation) (what is it with me and making lonely robots abandoned by everyone?)</a>

        </div>
      <RoomName>{room.key}{storenames[room.key.length%storenames.length]}</RoomName>
      <RoomSection>
        <OneCharAtATimeDiv text={dir_flavor + room.description}></OneCharAtATimeDiv></RoomSection>
      <RoomSection>Obvious exits are: {exits}.</RoomSection>
      {room.items.length > 0 ? <RoomSection>You see: <b>{room.items.join(", ")} </b>for sale.</RoomSection> : null}
      {room.people.length > 0 ? <RoomSection>You see: <b>{room.people.join(", ")}</b> standing around, sorting merchandise and watching you attentively. {room.people.length === 1?"They seem to be an employee of this store.":"They seem to be employees of this store."}</RoomSection> : null}

      {props.player.inventory.length > 0 && props.player.observer.inventoryMenuLevel > 0 ? <RoomSection>Inside your shopping bag is: {props.player.inventory.join(", ")}.</RoomSection> : null}
      <RoomSection>You have the following skills unlocked: {props.player.unlocked_skills_no_stats().map((skill) => { return skill.name }).join(", ")}.</RoomSection>
      <RoomSection>You have the following quests available to turn in: {props.player.questsAvailableToTurnIn().map((quest) => { return quest.title }).join(", ")}.</RoomSection>

      <RoomSection>You have: {props.numberFriends} helpful salespeople remaining.</RoomSection>
      {error.trim() !== "" ? <ErrorSection>Error: {error}</ErrorSection> : null}
      {message.trim() !== "" ? <RoomSection>Success! <b>{message}</b></RoomSection> : null}

      <RoomInput onKeyPress={(ev) => { checkEnter(ev.key, ev.target) }} placeholder="Type Action and Hit Enter..." autoFocus />
    </Fragment>

  )
}


export default ActualGame;

