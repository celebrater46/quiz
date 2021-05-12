"use strict";

// フィッシャー・イェーツのシャッフル
// 一番後ろの要素をランダムの場所へ移動し、後ろから２番めの要素をランダムの場所へ移動し……

{
  const question = document.getElementById("question");
  const choicesUl = document.getElementById("choicesUl");
  const button = document.getElementById("button");
  const result = document.getElementById("result");
  const scoreLabel = document.querySelector("#result > p");

  const quizSet = shuffle([
    {q: "What is A?", c: ["A0", "A1", "A2"]}, // 0番目が正解
    {q: "What is B?", c: ["B0", "B1", "B2"]},
    {q: "What is C?", c: ["C0", "C1", "C2"]},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }    
    return arr;
  }

  // question.textContent = quizSet[currentNum].q;

  // const shuffledChoices = shuffle([...quizSet[currentNum].c]);
  // // console.log(quizSet[currentNum].c);

  // shuffledChoices.forEach(choice => {
  //   const li = document.createElement("li");
  //   li.textContent = choice;
  //   choicesUl.appendChild(li);
  // });

  function checkAnswer(li) {
    // if (isAnswered === true) {
    if (isAnswered) { // 省略可
      return;
    }

    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      // console.log("correct!");
      li.classList.add("correct");
      score++;

    } else {
      // console.log("wrong");
      li.classList.add("wrong");
    }

    button.classList.remove("disabled");
  }

  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;

    while (choicesUl.firstChild) {
      choicesUl.removeChild(choicesUl.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    // console.log(quizSet[currentNum].c);
  
    shuffledChoices.forEach(choice => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => {
        checkAnswer(li);
      });
      choicesUl.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      button.textContent = "Show Score";
    }
  }

  setQuiz();

  button.addEventListener("click", () => {
    if (button.classList.contains("disabled")) {
      return;
    }
    button.classList.add("disabled");

    if (currentNum === quizSet.length - 1 ) {
      // console.log(`${score} / ${quizSet.length}`);
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove("hidden");
    } else {
      currentNum++;
      setQuiz();
    }
  });
}