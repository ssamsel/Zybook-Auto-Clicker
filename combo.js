async function doit() {
  // Function that returns a function that clicks all elements with class className
  const clicker = (className) => () =>
    Object.values(document.getElementsByClassName(className)).forEach((x) =>
      x.click()
    );

  // Check all 2x Speed boxes
  Object.values(document.getElementsByClassName("zb-checkbox")) // Get all checkbox divs
    .filter((d) =>
      Object.values(d.children) // Filter them...
        .some((t) => t.innerText === "2x speed")
    ) // ...such that the div is for a 2x speed checkbox
    .forEach((x) => x.children[0].click()); // Click/check the checkbox in the remaining divs

  // Click all start buttons
  clicker("start-button")();

  // Keep clicking all play buttons
  setInterval(clicker("play-button bounce"), 100);
  Object.values(document.getElementsByClassName("question-choices")).forEach(
    async (question) => {
      for (let i = 0; i < question.children.length; ++i) {
        question.children[i].children[0].click();
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  );
  const shortAnswers = Object.values(
    document.getElementsByClassName("short-answer-question")
  );

  shortAnswers.forEach(async (question) => {
    const input = question.children[0].children[1].children[0];
    const buttons = input.children[1];
    const showAnswrBtn = buttons.children[1];

    showAnswrBtn.click();
    showAnswrBtn.click();
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  shortAnswers.forEach((question) => {
    const input = question.children[0].children[1].children[0];
    const buttons = input.children[1];
    const answer = question.children[1].children[1].children[0].innerText;
    const checkBtn = buttons.children[0];
    const textBox = Object.values(input.children[0].children[0].children).find(
      (e) => e.getAttribute("spellcheck")
    );
    textBox.value = answer;
    textBox.dispatchEvent(new Event("change"));
    checkBtn.click();
  });
}
await doit();
