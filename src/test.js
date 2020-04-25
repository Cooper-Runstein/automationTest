const assert = require("assert");

const URL = "localhost:5000";

describe("webdriver.io page", () => {
  it("should have the right title", () => {
    browser.url(URL);
    const title = browser.getTitle();
    assert.strictEqual(title, "TODOS");
  });

  // It should display the text "No Todos!" before todos are added

  // It should take an input which will get added to the DOM when '+' is clicked

  // It should add all new todos to the bottom of the page

  // It should remove an item from the DOM when the "x" is clicked

  // It should once again display the text "No Todos!" before todos are added
});
