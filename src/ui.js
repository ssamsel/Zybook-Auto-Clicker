async function call(sleep, options) {
  if (options[0]) {
    animations();
  }
  if (options[1]) {
    dragAndDrop(sleep);
  }
  if (options[2]) {
    multipleChoice(sleep);
  }
  if (options[3]) {
    shortAnswers(sleep);
  }
}
// Create the dropdown button
const dropdownButton = document.createElement("button");
dropdownButton.innerHTML = "<b>ZyClicker Menu</b>";
dropdownButton.classList.add("fixed-button");

// Style the dropdown button
dropdownButton.style.position = "fixed";
dropdownButton.style.top = "60px"; // Adjust as needed
dropdownButton.style.right = "60px"; // Adjust as needed
dropdownButton.style.backgroundColor = "#F8A34C";
dropdownButton.style.color = "white";
dropdownButton.style.border = "none";
dropdownButton.style.padding = "10px 20px";
dropdownButton.style.borderRadius = "5px";
dropdownButton.style.cursor = "pointer";

// Create dropdown content
const dropdownContent = document.createElement("div");
dropdownContent.classList.add("dropdown-content");

// Create checkbox options

function createOption(text) {
  const cb = document.createElement("div");
  cb.innerHTML = `<label><input type="checkbox" checked="true"> ${text}</label>`;
  return cb;
}

const checkboxes = [
  createOption("Animations"),
  createOption("Drag-and-Drops"),
  createOption("Multiple Choice"),
  createOption("Short Answers"),
];

checkboxes.forEach((cb) => dropdownContent.appendChild(cb));

// Create label for text input
const sleepTimeLabel = document.createElement("label");
sleepTimeLabel.innerHTML = "Sleep Time:";
sleepTimeLabel.style.display = "block"; // Ensure it's on a separate line
sleepTimeLabel.style.marginTop = "10px";
dropdownContent.appendChild(sleepTimeLabel);

// Create text input for sleep time
const sleepTimeInput = document.createElement("input");
sleepTimeInput.setAttribute("type", "number");
sleepTimeInput.setAttribute("placeholder", "Enter sleep time...");
sleepTimeInput.setAttribute("min", "0"); // Restrict to non-negative integers
sleepTimeInput.setAttribute("value", 400);
sleepTimeInput.style.width = "100%"; // Expand to full width
sleepTimeInput.style.marginBottom = "10px"; // Add some spacing at the bottom
sleepTimeInput.addEventListener("click", (event) => event.stopPropagation());
dropdownContent.appendChild(sleepTimeInput);

// Create start button
const startButton = document.createElement("button");
startButton.innerHTML = "Start";
startButton.style.display = "block"; // Ensure it's on a separate line
startButton.addEventListener("click", function (event) {
  event.stopPropagation();
});

// Append start button to dropdown content
dropdownContent.appendChild(startButton);

// Prevent button click event from closing dropdown
startButton.addEventListener("click", function (event) {
  const sleep = parseInt(sleepTimeInput.value);
  const options = checkboxes.reduce(
    (acc, v) => [...acc, v.children[0].children[0].checked],
    []
  );
  console.log(options);
  call(sleep, options);
  event.stopPropagation();
});

// Prevent dropdown from hiding when interacting with checkboxes or text input
checkboxes.forEach((cb) =>
  cb.addEventListener("click", (event) => event.stopPropagation())
);

// Append dropdown content to dropdown button
dropdownButton.appendChild(dropdownContent);

// Show dropdown content when dropdown button is clicked
dropdownButton.addEventListener("click", function () {
  dropdownContent.style.display =
    dropdownContent.style.display === "block" ? "none" : "block";
});

// Append the dropdown button to the body
document.body.appendChild(dropdownButton);
dropdownContent.style.display = "none";
