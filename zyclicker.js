/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Swen Kooij / Photonios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*!
 * \class DndSimulatorDataTransfer
 *
 * \brief Re-implementation of the native \see DataTransfer object.
 *
 * \param data Optional: The data to initialize the data transfer object with.
 *
 * \see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
 */
var DndSimulatorDataTransfer = function () {
  this.data = {};
};

/*!
 * \brief Controls the feedback currently given to the user.
 *
 * Must be any of the following strings:
 *
 * - "move"
 * - "copy"
 * - "link"
 * - "none"
 *
 * The default is "move".
 *
 * \see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/dropEffect
 */
DndSimulatorDataTransfer.prototype.dropEffect = "move";

/*!
 * \brief Controls which kind of drag/drop operatins are allowed.
 *
 * Must be any of the following strings:
 *
 * - "none"
 * - "copy"
 * - "copyLink"
 * - "copyMove"
 * - "link"
 * - "linkMove"
 * - "move"
 * - "all"
 * - "uninitialized"
 *
 * The default is "all".
 *
 * \see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/effectAllowed
 */
DndSimulatorDataTransfer.prototype.effectAllowed = "all";

/*!
 * \brief List of files being dragged.
 *
 * This property will remain an empty list when the drag and drop operation
 * does not involve any files.
 *
 * \see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/files
 */
DndSimulatorDataTransfer.prototype.files = [];

/*!
 * \brief Read-only list of items being dragged.
 *
 * This is actually a list of \see DataTransferItem
 * \see https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem
 *
 * This property will remain an empty list when the drag and drop
 * operation does not involve any files.
 */
DndSimulatorDataTransfer.prototype.items = [];

/*!
 * \brief Read-only list of data formats that were set in
 *           the "dragstart" event.
 *
 * The order of the formats is the same order as the data
 * included in the drag operation.
 *
 * \see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types
 */
DndSimulatorDataTransfer.prototype.types = [];

/*!
 * \brief Removes all data.
 *
 * \param format Optional: Only remove the data associated with this format.
 *
 * \see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/clearData
 */
DndSimulatorDataTransfer.prototype.clearData = function (format) {
  if (format) {
    delete this.data[format];

    var index = this.types.indexOf(format);
    delete this.types[index];
    delete this.data[index];
  } else {
    this.data = {};
  }
};

/*!
 * \brief Sets the drag operation"s drag data to the specified data
 *          and type.
 *
 * \param format A string describing the data"s format.
 * \param data   The data to store (formatted according to the
 *                 specified format).
 *
 * \see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData
 */
DndSimulatorDataTransfer.prototype.setData = function (format, data) {
  this.data[format] = data;
  this.items.push(data);
  this.types.push(format);
};

/*!
 * \brief Retrives drag dta for the specified type.
 *
 * \param format A string describing the type of data to retrieve.
 *
 * \returns The drag data for the specified type, otherwise an empty string.
 *
 * \see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/getData
 */
DndSimulatorDataTransfer.prototype.getData = function (format) {
  if (format in this.data) {
    return this.data[format];
  }

  return "";
};

/*!
 * \brief Sets a custom image to be displayed during dragging.
 *
 * \param img         An image elment to use for the drag feedback image.
 * \param xOffset    A long indicating the horizontal offset within the image.
 * \param yOffset   A long indicating the veritcal offset within the image.
 */
DndSimulatorDataTransfer.prototype.setDragImage = function (
  img,
  xOffset,
  yOffset
) {
  /* since simulation doesn"t replicate the visual effects, there is
    no point in implementing this */
};

DndSimulator = {
  /*!
   * \brief Simulates dragging one element on top of the other.
   *
   * Specified elements can be CSS selectors.
   *
   * \param sourceElement The element to drag to the target element.
   * \param targetElement The element the source element should be
   *                        dragged to.
   */
  simulate: function (sourceElement, targetElement) {
    /* if strings are specified, assume they are CSS selectors */
    if (typeof sourceElement == "string") {
      sourceElement = document.querySelector(sourceElement);
    }

    if (typeof targetElement == "string") {
      targetElement = document.querySelector(targetElement);
    }

    /* get the coordinates of both elements, note that
        left refers to X, and top to Y */
    var sourceCoordinates = sourceElement.getBoundingClientRect();
    var targetCoordinates = targetElement.getBoundingClientRect();

    /* simulate a mouse down event on the coordinates
        of the source element */
    var mouseDownEvent = this.createEvent("mousedown", {
      clientX: sourceCoordinates.left,
      clientY: sourceCoordinates.top,
    });

    sourceElement.dispatchEvent(mouseDownEvent);

    /* simulate a drag start event on the source element */
    var dragStartEvent = this.createEvent("dragstart", {
      clientX: sourceCoordinates.left,
      clientY: sourceCoordinates.top,
      dataTransfer: new DndSimulatorDataTransfer(),
    });

    sourceElement.dispatchEvent(dragStartEvent);

    /* simulate a drag event on the source element */
    var dragEvent = this.createEvent("drag", {
      clientX: sourceCoordinates.left,
      clientY: sourceCoordinates.top,
    });

    sourceElement.dispatchEvent(dragEvent);

    /* simulate a drag enter event on the target element */
    var dragEnterEvent = this.createEvent("dragenter", {
      clientX: targetCoordinates.left,
      clientY: targetCoordinates.top,
      dataTransfer: dragStartEvent.dataTransfer,
    });

    targetElement.dispatchEvent(dragEnterEvent);

    /* simulate a drag over event on the target element */
    var dragOverEvent = this.createEvent("dragover", {
      clientX: targetCoordinates.left,
      clientY: targetCoordinates.top,
      dataTransfer: dragStartEvent.dataTransfer,
    });

    targetElement.dispatchEvent(dragOverEvent);

    /* simulate a drop event on the target element */
    var dropEvent = this.createEvent("drop", {
      clientX: targetCoordinates.left,
      clientY: targetCoordinates.top,
      dataTransfer: dragStartEvent.dataTransfer,
    });

    targetElement.dispatchEvent(dropEvent);

    /* simulate a drag end event on the source element */
    var dragEndEvent = this.createEvent("dragend", {
      clientX: targetCoordinates.left,
      clientY: targetCoordinates.top,
      dataTransfer: dragStartEvent.dataTransfer,
    });

    sourceElement.dispatchEvent(dragEndEvent);

    /* simulate a mouseup event on the target element */
    var mouseUpEvent = this.createEvent("mouseup", {
      clientX: targetCoordinates.left,
      clientY: targetCoordinates.top,
    });

    targetElement.dispatchEvent(mouseUpEvent);
  },

  /*!
   * \brief Creates a new fake event ready to be dispatched.
   *
   * \param eventName The type of event to create.
   *                    For example: "mousedown".
   * \param options    Dictionary of options for this event.
   *
   * \returns An event ready for dispatching.
   */
  createEvent: function (eventName, options) {
    var event = document.createEvent("CustomEvent");
    event.initCustomEvent(eventName, true, true, null);

    event.view = window;
    event.detail = 0;
    event.ctlrKey = false;
    event.altKey = false;
    event.shiftKey = false;
    event.metaKey = false;
    event.button = 0;
    event.relatedTarget = null;

    /* if the clientX and clientY options are specified,
        also calculated the desired screenX and screenY values */
    if (options.clientX && options.clientY) {
      event.screenX = window.screenX + options.clientX;
      event.screenY = window.screenY + options.clientY;
    }

    /* copy the rest of the options into
        the event object */
    for (var prop in options) {
      event[prop] = options[prop];
    }

    return event;
  },
};
async function shortAnswers() {
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
async function multipleChoice(SLEEP_TIME) {
  Object.values(
    document.getElementsByClassName("multiple-choice-question")
  ).forEach(async (question) => {
    const choices = Object.values(
      question.children[0].children[1].children
    ).map((x) => x.children[0]);

    for (
      let i = 0;
      question.children[1].getAttribute("class") !==
      "zb-explanation has-explanation correct";
      ++i
    ) {
      choices[i].click();
      await new Promise((resolve) => setTimeout(resolve, SLEEP_TIME));
    }
  });
}
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
let animationClicker = undefined;
async function call(sleep, options) {
  if (options[0]) {
    animationClicker = animations();
  }
  if (options[1]) {
    await dragAndDrop(sleep);
  }
  if (options[2]) {
    await multipleChoice(sleep);
  }
  if (options[3]) {
    await shortAnswers(sleep);
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

const stopButton = document.createElement("button");
stopButton.innerHTML = "Stop Animations";
stopButton.style.display = "block"; // Ensure it's on a separate line
stopButton.addEventListener("click", function (event) {
  clearInterval(animationClicker);
  event.stopPropagation();
});

const quitButton = document.createElement("button");
quitButton.innerHTML = "Quit ZyClicker";
quitButton.style.display = "block"; // Ensure it's on a separate line
quitButton.addEventListener("click", function (event) {
  clearInterval(animationClicker);
  dropdownButton.remove();
  event.stopPropagation();
});

// Append start button to dropdown content
dropdownContent.appendChild(startButton);
dropdownContent.appendChild(stopButton);
dropdownContent.appendChild(quitButton);

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
