async function init() {
  const response = await fetch("https://opentdb.com/api.php?amount=4");
  const obj = await response.json();
  const Queez_array = Object.entries(obj);
  const QueezList = Queez_array[1][1];
  const QueezList_items = QueezList.map((v) => Object.entries(v));

// greenCounter counts correct answers
  let greenCounter = 0;

  //Randomize the answers in the array && question array
  let correct_answer = [];
  let answer_items = [];
  let incorrect_answer = [];

  function random_answer(level) {
    incorrect_answer[level] = QueezList_items[level][5][1];
    let max = incorrect_answer[level].length;
    let rand = Math.random() * max;
    rand = Math.floor(rand);
    correct_answer = QueezList_items[level][4][1];
    answer_items = [...incorrect_answer[level]];
    answer_items.splice(rand, 0, correct_answer);
    return answer_items;
  }

  let INITIAL_LEVEL = 0;
  let TOTAL_LEVELS = QueezList_items.length - 1;
  // question array
  const questions = [];
  for (let i = 0; i < QueezList_items.length; i++) {
    questions.push(QueezList_items[i][3][1]);
  }
  // start()
  // question title tag
  const question_title = document.getElementById("question");
  function start(level) {
    question_title.textContent = questions[level];

    // boxes items

    let Answers = random_answer(level);
    for (let i = 0; i < Answers.length; i++) {
      let answerBox = document.createElement("button");
      let queez_boxes = document.getElementById("queez_boxes");
      answerBox.className = "box";
      queez_boxes.appendChild(answerBox);
      document.getElementsByClassName("box")[i].textContent = Answers[i];
    }
    for (let j = 0; j < random_answer(level).length; j++) {
      correct_answer = QueezList_items[level][4][1];
      document
        .getElementsByClassName("box")
        [j].addEventListener("click", (event) => {
          if (random_answer(level)[j] == correct_answer) {
            document.getElementsByClassName("circle")[
              level
            ].style.backgroundColor = "green";
            greenCounter++;
            document.querySelectorAll(".box").forEach((e) => e.remove(event));
            nextLevel(level);
          } else {
            document.getElementsByClassName("circle")[
              level
            ].style.backgroundColor = "red";
            document.querySelectorAll(".box").forEach((e) => e.remove(event));
            nextLevel(level);
          }
        });
    }
    console.log(greenCounter);
  }
  function nextLevel(currentLevel) {
    const nextLevel = currentLevel + 1;

    if (nextLevel > TOTAL_LEVELS) {
      return finish();
    }

    start(nextLevel);
  }

  function finish() {
    question_title.textContent = "your score : "+greenCounter;
  }
  start(INITIAL_LEVEL);
}
init();
