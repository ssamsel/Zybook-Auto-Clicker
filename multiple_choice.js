Object.values(document.getElementsByClassName("question-choices")).forEach(
  async (question) => {
    for (let i = 0; i < question.children.length; ++i) {
      question.children[i].children[0].click();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
);
