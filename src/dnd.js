async function dragAndDrop(SLEEP_TIME) {
  async function doDnD(element) {
    const source = Object.values(element.children[1].children[0].children).map(
      (x) => x.children[0].children[0].children[0].innerText
    );
    const dest = Object.values(element.children)
      .filter((x) => x.getAttribute("class") === "definition-row")
      .map((x) => x.children[0].getAttribute("id"));

    const resetBtn = Object.values(element.children).find(
      (x) => x.getAttribute("class") === "reset-button-container"
    ).children[0];

    const map = {};
    for (let i = 0; i < source.length; ++i) {
      for (let j = 0; j < source.length; ++j) {
        if (Object.values(map).some((x) => x === dest[j])) {
          continue;
        }
        DndSimulator.simulate(getSrcByName(element, source[i]), `#${dest[j]}`);
        await new Promise((resolve) => setTimeout(resolve, SLEEP_TIME));
        if (checkAnswer(dest[j])) {
          map[source[i]] = dest[j];
        }
        resetBtn.click();
        await new Promise((resolve) => setTimeout(resolve, SLEEP_TIME));
      }
    }
    console.log(map);
    for (const a in map) {
      DndSimulator.simulate(getSrcByName(element, a), `#${map[a]}`);
      await new Promise((resolve) => setTimeout(resolve, SLEEP_TIME));
    }
  }

  function checkAnswer(e) {
    return (
      document
        .getElementById(e)
        .parentElement.children[1].getAttribute("class") ===
      "definition-match-explanation correct"
    );
  }

  function getSrcByName(element, text) {
    return Object.values(element.children[1].children[0].children).find(
      (x) => x.children[0].children[0].children[0].innerText === text
    ).children[0];
  }

  Object.values(
    document.getElementsByClassName("definition-match-payload")
  ).forEach(doDnD);
}
