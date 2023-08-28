const n = 20; //Number of bar
const array = [];

init(); //automatically calls init whenever refreshed

let audioCtx = null;
function playNote(freq) {
  if (audioCtx == null) {
    audioCtx = new (AudioContext ||
      webkitAudioContext ||
      window.webkitAudioContext)();
  }
  const dur = 0.1;
  const osc = audioCtx.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.stop(audioCtx.currentTime + dur);
  const node = audioCtx.createGain();
  node.gain.value = 0.1;
  node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
  osc.connect(node);
  node.connect(audioCtx.destination);
}
let animationStopped = false;
// Function init
function init() {
  // Generating random numbers
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
  //everytime initialize this we also need to show the bars
  showBars();
}

//to call bubble sort play function
function play() {
  const copy = [...array];
  const moves = bubbleSort(copy); //we can't use array as it will swap array and make us to swap another one immediatly without showing animation
  animate(moves);
}
function animate(moves) {
  if (animationStopped || moves.length === 0) {
    animationStopped = false; // Reset the flag for future animations
    showBars();
    return;
  }

  const move = moves.shift(); //shift method takes out the first elemnt of the moves array
  const [i, j] = move.indices;
  if (move.type == "swap") {
    [array[i], array[j]] = [array[j], array[i]];
  }
  playNote(200 + array[i] * 500);
  playNote(200 + array[i] * 500);
  showBars(move);
  setTimeout(function () {
    animate(moves);
  }, 70);
}

//Bubble sort
function bubbleSort(array) {
  const moves = []; //keeping track of all the changes
  do {
    var swapped = false;
    for (let i = 1; i < array.length; i++) {
      //   moves.push({ indices: [i - 1, i], type: "comp" });
      if (array[i - 1] > array[i]) {
        swapped = true;
        moves.push({ indices: [i - 1, i], type: "swap" }); // moves object containing two elements telling what type of move is this
        [array[i - 1], array[i]] = [array[i], array[i - 1]]; //structuring assignment to swap
      }
    }
  } while (swapped);
  return moves;
}

//Showing bars
function showBars(move) {
  //set the container empty before again init otherwise bars wolud be displayed with previous ones
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");

    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type == "swap" ? "red" : "blue";
    }
    container.appendChild(bar);
  }
}
function stop() {
  animationStopped = true;
}
