# MusicalSortingVisualizer 
<div id="header" align="center">
  
  [SVdemo.webm](https://github.com/ShreyaDhiman24/SortingVisualizer/assets/98320971/9ace0828-b458-4ff1-a53f-e32b9c34edc2)

</div>

---

## 1. **Project Overview**
This project is a **sorting algorithm visualizer** that displays the sorting process using **animated bars** and provides **audio feedback**. Users can start, stop, and switch between multiple sorting algorithms to understand how they work in real-time.

**Why?**  
Sorting algorithms are fundamental to computer science, and visualizing them makes it easier to understand their behavior. Adding audio feedback gives an extra dimension to the learning experience.

**What?**  
- The **sorting process** is shown using animated bars.  
- **Audio tones** indicate operations such as comparisons and swaps.  
- The visualizer supports **multiple sorting algorithms**: Bubble Sort, Insertion Sort, Selection Sort, and Ripple Sort.

**How?**  
The project uses **HTML, CSS, and JavaScript**. The bars are created dynamically in the DOM, and the sorting algorithms are implemented to **animate swaps and play sounds using the Web Audio API**.

---

## 2. **Tech Stack**
- **HTML/CSS:** Layout and styling of the visualizer  
- **JavaScript:** Logic for animations, sorting algorithms, and audio generation  
- **Web Audio API:** To create sound tones during swaps and comparisons  

---

## 3. **High-Level Design**
The system is divided into the following components:

1. **UI Component**  
   - The bars representing array elements are generated dynamically inside a container.
   - Colors are used to highlight swaps (red) and comparisons (blue).  
   
2. **Sorting Algorithms Module**  
   - Four sorting algorithms (Bubble Sort, Insertion Sort, Selection Sort, and Ripple Sort) are implemented to track and store **swap operations**.

3. **Animation and Sound Module**  
   - The `animate()` function controls the animation and ensures a smooth sorting display with time delays.  
   - The `playNote()` function generates sound based on the value of the element being swapped.

4. **User Controls**  
   - Functions to start, stop, and reset animations are provided, along with options to switch between sorting algorithms.

---

## 4. **Low-Level Design**
This section dives deeper into how individual components are implemented.

### 4.1 **Array Initialization and UI Rendering**
- **Why?**  
  We need to initialize the bars dynamically based on random values, ensuring each refresh gives a new unsorted array.  
- **How?**  
  The `init()` function generates an array of random numbers between 0 and 1. The `showBars()` function renders these numbers as **vertical bars** inside a container. Each bar’s height corresponds to its value.

```javascript
function init() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random(); 
  }
  showBars();
}
```

---

### 4.2 **Animation and Audio Feedback**
- **What?**  
  The `animate()` function animates the swap operations, and the `playNote()` function generates sounds to represent swaps.  
- **How?**  
  For every swap, a **tone** is played using the Web Audio API, and the bars are re-rendered with updated heights and colors.

```javascript
function animate(moves) {
  if (animationStopped || moves.length === 0) {
    animationStopped = false;
    showBars();
    return;
  }

  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type == "swap") {
    [array[i], array[j]] = [array[j], array[i]];
  }
  playNote(200 + array[i] * 500);  
  showBars(move);
  
  setTimeout(() => animate(moves), 70);
}
```

---

### 4.3 **Sorting Algorithms**
- **What?**  
  We implemented four sorting algorithms to showcase how different algorithms behave.  
- **Why?**  
  Each algorithm has unique properties (e.g., Bubble Sort is easy but slow; Selection Sort reduces swaps).  
- **How?**  
  Each algorithm stores **swap operations** in the `moves` array to animate them later.

```javascript
function bubbleSort(array) {
  const moves = [];
  do {
    let swapped = false;
    for (let i = 1; i < array.length; i++) {
      if (array[i - 1] > array[i]) {
        swapped = true;
        moves.push({ indices: [i - 1, i], type: "swap" });
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
      }
    }
  } while (swapped);
  return moves;
}
```

---

### 4.4 **Audio Generation**
- **What?**  
  We use the **Web Audio API** to generate tones based on array values.  
- **How?**  
  The **frequency** of each tone is dynamically calculated using the element’s value to give each bar a unique sound.

```javascript
function playNote(freq) {
  if (audioCtx == null) {
    audioCtx = new (AudioContext || webkitAudioContext)();
  }
  const osc = audioCtx.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);

  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.1;
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
}
```

---

## 5. **Features**
1. **Real-time Animation**: Visualize sorting with smooth animations.
2. **Audio Feedback**: Each swap or comparison plays a sound tone.
3. **Multiple Algorithms**: Supports Bubble, Insertion, Selection, and Ripple Sort.
4. **User Controls**: Start, stop, and switch algorithms easily.

---

## 6. **Algorithms Explained**
1. **Bubble Sort**: Repeatedly swaps adjacent elements if they are in the wrong order.  
2. **Insertion Sort**: Builds the sorted array one element at a time.  
3. **Selection Sort**: Selects the smallest element from the unsorted part in each iteration.  
4. **Ripple Sort**: A variation of Bubble Sort that sorts in both directions alternately.

---

## 7. **How to Run**
1. Clone the repository.  
2. Open the `index.html` file in your browser.  
3. Click the **play buttons** to start different algorithms.  
4. Use the **stop button** to stop the animation at any point.

---

## 8. **Code Walkthrough**
The code is structured into:
- **`init()`**: Initializes the array and UI.
- **`playNote()`**: Plays sound for swaps.
- **Sorting Functions**: Store and return swap operations for animation.
- **`animate()`**: Animates the sorting process.

---

## 9. **Challenges and Trade-offs**
1. **Animation Speed**: Too fast makes it hard to follow; too slow becomes boring.
2. **Audio Overlap**: Playing multiple notes can overlap and distort the sound.
3. **Browser Compatibility**: Web Audio API may behave differently on some browsers.

---

This sorting visualizer is both an educational tool and a fun way to understand sorting algorithms with the added element of sound.
