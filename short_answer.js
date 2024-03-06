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
