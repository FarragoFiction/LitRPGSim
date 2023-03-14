export const achieveGnosis4 = ()=>{
  console.log("The Truth is: That was not really a train.")

  const body = document.querySelector("body");
  body.innerHTML = "Hello World";
}

export const achieveGnosis3 = ()=>{
  console.log("The Truth is: Those are not really walls.")
  const room = document.querySelector("#present");
  room.style.overflow = "visible";//if you just manually set noclip you'll be disapointed because you won't have this

  window.noClip = true;
}

const achieveGnosisNegative1 = ()=>{
  console.log("You will remember nothing...");
  window.location.href = window.location.href;
}