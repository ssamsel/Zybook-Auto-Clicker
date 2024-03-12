function animations() {
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
  return setInterval(clicker("play-button bounce"), 500);
}
