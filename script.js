const n = 30; //Number of bar
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
function insertionSort(array) {
  const moves = []; // Keeping track of all the changes
  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j - 1] > array[j]) {
      moves.push({ indices: [j - 1, j], type: "swap" });
      [array[j - 1], array[j]] = [array[j], array[j - 1]];
      j--;
    }
  }
  return moves;
}
function playInsertionSort() {
  const copy = [...array];
  const moves = insertionSort(copy);
  animate(moves);
}
function selectionSort(array) {
  const moves = []; // Keeping track of all the changes
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      moves.push({ indices: [i, minIndex], type: "swap" });
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
  return moves;
}
function playSelectionSort() {
  const copy = [...array];
  const moves = selectionSort(copy);
  animate(moves);
}
function rippleSort(array) {
  const moves = []; // Keeping track of all the changes
  let swapped;
  do {
    swapped = false;

    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        moves.push({ indices: [i, i + 1], type: "swap" });
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }

    if (!swapped) {
      break;
    }

    swapped = false;

    for (let i = array.length - 2; i >= 0; i--) {
      if (array[i] > array[i + 1]) {
        moves.push({ indices: [i, i + 1], type: "swap" });
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }
  } while (swapped);

  return moves;
}
function playRippleSort() {
  const copy = [...array];
  const moves = rippleSort(copy);
  animate(moves);
}