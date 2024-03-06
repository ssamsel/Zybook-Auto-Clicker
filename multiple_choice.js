Object.values(
  document.getElementsByClassName("multiple-choice-question")
).forEach(async (question) => {
  const choices = Object.values(question.children[0].children[1].children).map(
    (x) => x.children[0]
  );

  for (
    let i = 0;
    question.children[1].getAttribute("class") !==
    "zb-explanation has-explanation correct";
    ++i
  ) {
    choices[i].click();
    await new Promise((resolve) => setTimeout(resolve, 350));
  }
});
