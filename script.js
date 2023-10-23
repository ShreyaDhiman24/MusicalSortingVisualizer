const n = 30; //Number of bar
const array = [];

init(); //automatically calls init whenever refreshed

let audioCtx = null;

function playNote(freq) {
  if (audioCtx == null) {
    audioCtx = new (AudioContext ||
      webkitAudioContext ||
      window.webkitAudioContext)();  //creates an AudioContext. The AudioContext is the central interface for playing audio in the Web Audio API.
  }
  const dur = 0.1; //represents the duration of the note in seconds.
  const osc = audioCtx.createOscillator(); //creates an oscillator node, which generates an audio signal. It's like a sound source for our note.
  osc.frequency.value = freq; // determines the pitch of the note to be played.
  osc.start(); //oscillator begins generating sound at this point.
  osc.stop(audioCtx.currentTime + dur); //scheduling the oscillator to stop after dur seconds.
  const node = audioCtx.createGain(); //GainNode is created. Gain nodes control the amplitude (volume) of the audio.
  node.gain.value = 0.1; //initial volume of the note.
  node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur); //schedules a linear change in the gain value of the GainNode. It starts at the current gain value (0.1) and linearly decreases to 0 over the duration of the note (defined by dur)
  osc.connect(node); //connects the oscillator to the GainNode, allowing the generated sound to be controlled by the GainNode.
  node.connect(audioCtx.destination); //GainNode is connected to the AudioContext's destination. This means the audio signal will be played through the computer's audio output.
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
  const moves = bubbleSort(copy); //we can't use array as it will swap 
  //array and make us to swap another one immediatly without showing animation
  animate(moves);
}
function animate(moves) {
  if (animationStopped || moves.length === 0) {
    animationStopped = false; // Reset the flag for future animations
    showBars();
    return; //exits early if the animation is stopped or no more moves are left to process.
  }

  const move = moves.shift(); //shift method takes out the first elemnt of the moves array // first move in the moves array is removed and stored in the move variable. This represents the current operation (comparison or swap) being animated.
  const [i, j] = move.indices; //indices of the elements being compared or swapped are extracted from the move object and assigned to i and j
  if (move.type == "swap") {
    [array[i], array[j]] = [array[j], array[i]];  //If it's a swap, the elements at indices i and j in the original array are swapped using destructuring assignment.
  }
  playNote(200 + array[i] * 500); //pitch of the note is determined by array[i], and the notes are played twice in quick succession.
  playNote(200 + array[i] * 500);
  showBars(move); //called to visually update the bars in response to the current move.
  setTimeout(function () {
    animate(moves);
  }, 70); //A timer is set to call the animate function with the remaining moves after a 70-millisecond delay, creating the animation effect by processing moves with a small time interval between them.


}

//Bubble sort
function bubbleSort(array) {
  const moves = []; //keeping track of all the changes  (comparisons and swaps) made during the sorting process.
  do {
    var swapped = false;
    for (let i = 1; i < array.length; i++) {
      //   moves.push({ indices: [i - 1, i], type: "comp" });
      if (array[i - 1] > array[i]) {
        swapped = true;
        moves.push({ indices: [i - 1, i], type: "swap" }); // moves object containing two elements telling what type of move is this //If a swap is made, an object is added to the moves array. This object contains information about the move, including the indices of the elements being swapped and the type of move ("swap").


        [array[i - 1], array[i]] = [array[i], array[i - 1]]; //structuring assignment to swap
      } 
    }
  } while (swapped); //purpose of this loop is to keep iterating through the array and performing bubble sort until no more swaps are needed, indicating that the array is sorted.
  return moves;
}

//Showing bars
function showBars(move) {
  //set the container empty before again init otherwise bars wolud be displayed with previous ones
  container.innerHTML = ""; //This line clears the content of the container, effectively removing any previously displayed bars. This is important because you want to display the bars representing the current state of the array and avoid displaying bars from previous steps.
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div"); //For each element in the array, a new div element, which will represent a bar, is created.
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");

    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type == "swap" ? "red" : "blue"; //represents a "swap," the background color of the bar is set to "red"; otherwise, it's set to "blue." This coloring is used to visually highlight the bars involved in a swap operation.
    }
    container.appendChild(bar); //the bar element is added to the container, which is likely an HTML element (e.g., a div) where the bars are displayed.
  }
}
function stop() {
  animationStopped = true; //The animation logic (in earlier code) checks the value of this flag to determine whether to continue or stop the animation. When animationStopped is set to true, it prevents further iterations of the animation loop.
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