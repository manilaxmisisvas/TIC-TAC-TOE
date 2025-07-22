const box = document.querySelectorAll(".box"); //* this returns nodelist
const boxes = Array.from(box); //*forming array using nodelist so that we can iterate the elements
// console.log(boxes);
const b1 = document.getElementById("one"); // accessing all the box elements using their id.
const b2 = document.getElementById("two");
const b3 = document.getElementById("three");
const b4 = document.getElementById("four");
const b5 = document.getElementById("five");
const b6 = document.getElementById("six");
const b7 = document.getElementById("seven");
const b8 = document.getElementById("eight");
const b9 = document.getElementById("nine");
const scorecard = document.getElementById("score-card");
let activeplayer = 0; //*global variable to indicate the players turn
const resetbutton = document.getElementById("resetbtn");
let clicks = []; //array to track all the clicked boxes in the order. this helps us to track which player clicked first and which player clicked last (before end of game)

setInterval(() => {
  // calling function to check the conditions for end of game for every second.
  // (control + click on function name "Gameend" to see  implementaion)
  Gameend();
}, 1000);

// ?  function to update the content of boxes on click

const addcontent = (e) => {
  activeplayer = !activeplayer; //here we are changing the turn of the player once one player is clicked. on changing this the turn of player changes
  let clicked = e.target.id; //? this is to obtain the specific box id which is clicked
  let clickedsquare = document.getElementById(clicked); //this is to obtain the specific box among the 9 boxes in the game board (grid). using id, which is obtained just above

  if (clickedsquare.textContent == "" && activeplayer == 1) {
    // 1 & 0 indicates 2 different players
    clickedsquare.textContent = "X";
  } else if (clickedsquare.textContent == "" && activeplayer == 0) {
    clickedsquare.textContent = "O";
  } else if (
    clickedsquare.textContent != "" &&
    (activeplayer == 1 || activeplayer == 0)
  ) {
    activeplayer = !activeplayer; // this is because even the wrong click also counts and the player turn changes, so to maintain the   actual player turn we change activeplayer value even for the wrong or unwanted click.
    alert("please choose empty box");
  }

  clicks.push(clickedsquare.textContent);
  //pushing every clicked buttons textcontent to array (using this at last ,because if we push before all these if-else ststements ,the content in every box is empty thats why we are pushing after adding the content)
};

//? function to reset the game board to empty values after end of the game
function reset() {
  boxes.forEach((box) => {
    box.textContent = "";
  });
}

resetbutton.addEventListener("click", reset);

function Gameend() {
  const winPatterns = [
    [b1, b2, b3],
    [b4, b5, b6], //possible patterns to win (rows, columns, diagonals)
    [b7, b8, b9],
    [b1, b4, b7],
    [b2, b5, b8],
    [b3, b6, b9],
    [b1, b5, b9],
    [b3, b5, b7],
  ];

  for (let pattern of winPatterns) {
    let [first, second, third] = pattern;
    if (
      first.textContent !== "" &&
      first.textContent === second.textContent &&
      second.textContent === third.textContent
    ) {
      //* in order to determine which player have won, we are using who clicked first and who clicked last. (before this we have pushed all the clicks into an array. we are using that array here)
      if (clicks[0] === "X" && clicks[clicks.length - 1] === "X") {
        alert(`GAME OVER PLAYER 1 WINS 🏆 `);
        console.log(clicks.length);
      } else if (clicks[0] === "O" && clicks[clicks.length - 1] === "O") {
        alert(`GAME OVER PLAYER 1 WINS 🏆`);
        console.log(clicks.length);
      } else if (clicks[0] === "X" && clicks[clicks.length - 1] === "O") {
        alert(`GAME OVER PLAYER 2 WINS 🏆`);
      } else if (clicks[0] === "O" && clicks[clicks.length - 1] === "X") {
        alert(`GAME OVER PLAYER 2 WINS 🏆`);
      }
      // console.log(clicks.length);
      clicks.splice(0, clicks.length); //emptying array after end of the game, so that new clicks are pushed from start. else it will maintain the same order
      // console.log(clicks.length);

      reset();
      return;
    }
  }
  //for draw
  if (
    [b1, b2, b3, b4, b5, b6, b7, b8, b9].every((box) => box.textContent !== "")
  ) {
    alert("It's a DRAW! 👎, PLAY AGAIN");
    clicks.splice(0, clicks.length);

    reset();
  }
}

//!using for of loop to add eventlistener to all the 9 boxes.
for (const box of boxes) {
  box.addEventListener("click", addcontent); //addcontent function must be initialised before calling as it is concerned with event listener,thats why this block is written here
}
