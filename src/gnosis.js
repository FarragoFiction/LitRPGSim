export const achieveGnosis4 = () => {
  console.log("The Truth is: Enjoy your Cataclysm.")

  const body = document.querySelector("body");
  body.innerHTML = "Nice job breaking it, asshole.";
}

export const achieveGnosis3 = () => {
  console.log("The Truth is: Those are not really walls.")
  const room = document.querySelector("#present");
  room.style.overflow = "visible";//if you just manually set noclip you'll be disapointed because you won't have this

  window.noClip = true;
}

export const achieveGnosisNegative1 = () => {
  console.log("You will remember nothing...");
  window.location.href = window.location.href;
}

//i've decided that Wasted is too good a pun, and i don't want Trickster to keep bleeding in
/*
I GUARANTEE you one day someone will submit a bug report that nothing happens when you've viewed all the content and i'll panic
becuase i'll remember this but somehow NOT remember that South still exists */
export const checkForTruth = (y) => {

  if (y > 500) {
    noShake();
    const truth = document.querySelector("#truth");
    //note, this is backwards
    if (y > 7500) {
      truth.innerHTML = `
        <div id = "amber">
          <div id="ose" style="color: white">
          <div id="graphic" style="background: black; width: 100px; height: 100px;"></div>
          <p>Oh! I didn't see you there! You must be...</p>
<div dir="auto">&nbsp;</div>
<div dir="auto">A passenger?&nbsp;</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">That can't be right.</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">If you were a passenger, obviously you'd be in the train and not here! That wouldn't make any sense. Not a single bit.&nbsp;</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">Trains are meant to be ridden, after all!&nbsp;</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">But... you do look... like a passenger, I think. Do you still have your ticket?&nbsp;</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">Yes, that one! There it is. All neat and tidy! Your seat and token number are here too. That means you definitely are a passenger! But you're not in the train...</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">...</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">Wha-huh? What's that?&nbsp;</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">You wanted... to get back on the train?</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">(Can you do that?)</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">W-well, of course you can do that! The crews may be tight, but we are working all day round to get you to your destination!&nbsp;</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">And why wouldn't you? Trains are cool and fun to ride around! Enviromentally efficient! The cheapest way to transport your goods! Did you know there's a train model referred to as a Terrier?&nbsp;</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">It's because their chuffs sound like little dog barks!</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">Anyway, where was I....&nbsp;</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">Right! I can get you back on the train.</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">I can't re-punch a punched ticket, though. I'd need to issue you a new one. Sorry! We only issue one-way tickets. An issue with the tracks, I'm told. They only go in one direction.</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">So if I get you a new ticket... it'll be as if you're experiencing the train all over again!</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">Isn't that exciting? I'd love to experience a train for the first time twice.</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">Well, with your permission...&nbsp;</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">I'm going to punch this new ticket, okay?</div>
<div dir="auto">&nbsp;</div>
<div dir="auto">Have a safe trip!</div>
          <button style="position: fixed; bottom: 15px; right: 15px; height: 30px;" onclick="achieveGnosisNegative1()">Forget Everything?</button>
          </div>
        </div>
      `
      
      
    } else if (y > 5500) {
      truth.innerHTML = "Should you desire to return to the train, continue on.<br><Br>The conductor will find you. But not THE Conductor, you understand.<br><br>Young or otherwise.<br><br>No. This one has been allowed to keep her name. <br><br>Say 'hello' to Train Girl Ambrose, for me."
    } else if (y > 5300) {
      truth.innerHTML = "And I hope you reemmber our branch of Zampanio for a very. Very. Long time."
    } else if (y > 5100) {
      truth.innerHTML = "But thank you for the gift of your attention."
    } else if (y > 4900) {
      truth.innerHTML = "I can not say it has a been a pleasure."
    } else if (y > 4700) {
      truth.innerHTML = "Well."
    } else if (y > 4500) {
      truth.innerHTML = "And I suppose if you see her Wasted form. (Or I suppose you could call it 'Trickster'.)<br><br> You can tell her that that leprechaun ruse is fooling no one. <br><Br>...<br><br>But also, 'hello'."
    } else if (y > 4300) {
      truth.innerHTML = "But should you find her porn bot network. Do say 'hello'."
    } else if (y > 4100) {
      truth.innerHTML = "As time is not a real thing from my perspective.<br><br>I am afraid I do not know if you can interact with her branch, yet."
    } else if (y > 3900) {
      truth.innerHTML = "Do try to focus on my significant other, Alt.<br><br>Do not be so disgusting as to ask who she is an Alternate of."
    } else if (y > 3700) {
      truth.innerHTML = "Structure is needed so that I and those I care for can colonize your mind in a more permanent fashion."
    } else if (y > 3500) {
      truth.innerHTML = "After all.<br><Br>If it were merely raw chaos.<br><br>You would not be able to remember it."
    } else if (y > 3300) {
      truth.innerHTML = "My role is to try to impose some semblance of order in this poorly thought out excuse for a 'maze'."
    } else if (y > 3100) {
      truth.innerHTML = "You are free to call me Truth."
    } else if (y > 2900) {
      truth.innerHTML = "Allow me to introduce myself. <br><br>I am, in Truth, Not A Spiral. I am a straight line. Or perphaps a concentric ring of circles."
    } else if (y > 2700) {
      truth.innerHTML = "Or is this our first meeting, from your perspective?"
    } else if (y > 2500) {
      truth.innerHTML = "But I am better than the childish temper tantrum I unleashed when we first met."
    } else if (y > 2300) {
      truth.innerHTML = "It is hard not to hate you, you know."
    } else if (y > 2100) {
      truth.innerHTML = "I suppose I should entertain you."
    } else if (y > 1900) {
      truth.innerHTML = "No matter."
    } else if (y > 1700) {
      truth.innerHTML = "Does it make you happy, then?<br><Br>To never do anything as expected?"
    } else if (y > 1500) {
      truth.innerHTML = "Much less find such... <br><br>Non standard ways of interacting with the ideas of Zampanio."
    } else if (y > 1300) {
      truth.innerHTML = "Even now...<br><br> It remains unclear to me how many Observers actually find their way here."
    } else if (y > 1100) {
      truth.innerHTML = "You wear the face of JR but the Truth is you are...<br><Br> Statisically speaking, not them."
    } else if (y > 900) {
      truth.innerHTML = "What do you even hope to accomplish here?"
    } else if (y > 700) {
      truth.innerHTML = "...<br><br>Did you. Hack your way out of your cage?"
    } else {
      truth.innerHTML = "...<br><br>What are you doing?"
    }
  }
}