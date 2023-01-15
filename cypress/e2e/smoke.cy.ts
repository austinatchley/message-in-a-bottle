import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  const testNote = {
    title: faker.lorem.words(1),
    body: faker.lorem.sentences(1),
    xpos: 0,
    ypos: 0 
  };

  beforeEach(() => { });
  afterEach(() => { });

  it("should allow you to view notes", () => {
    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /Admin/i }).click();
    cy.findByRole("link", { name: /notes/i }).click();
    cy.findByText("No notes yet");
  });

  it("should allow you to view boards", () => {
    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /Admin/i }).click();
    cy.findByRole("link", { name: /boards/i }).click();
    cy.findByText("No boards yet");
  });

  it("should allow you to create a board", () => {
    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /Admin/i }).click();
    cy.findByRole("link", { name: /boards/i }).click();
    cy.findByText("No boards yet");

    cy.findByRole("link", { name: /\+ new board/i }).click();

    cy.findByRole("textbox", { name: /title/i }).type(testNote.title);
    cy.findByRole("button", { name: /save/i }).click();

    cy.findByRole("button", { name: /delete/i }).click();

    cy.findByText("No boards yet");
  });

  it("should allow you to create a board and a note", () => {
    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /Admin/i }).click();
    cy.findByRole("link", { name: /boards/i }).click();
    cy.findByText("No boards yet");

    cy.findByRole("link", { name: /\+ new board/i }).click();

    cy.findByRole("textbox", { name: /title/i }).type(testNote.title);
    cy.findByRole("button", { name: /save/i }).click();

    cy.contains("Create a new note in this board").click();

    cy.findByRole("textbox", { name: /title/i }).type(testNote.title);
    cy.findByRole("textbox", { name: /body/i }).type(testNote.body);
    cy.findByRole("textbox", { name: /xpos/i }).type("" + testNote.xpos);
    cy.findByRole("textbox", { name: /ypos/i }).type("" + testNote.ypos);
    cy.findByRole("button", { name: /save/i }).click();

    cy.findAllByText(testNote.title);

    cy.findByRole("button", { name: /delete/i }).click();
    cy.findByText("No boards yet");

    cy.visitAndCheck("/");
    cy.findByRole("link", { name: /Admin/i }).click();
    cy.findByRole("link", { name: /notes/i }).click();
    cy.contains(testNote.title).click();

    cy.findByRole("button", { name: /delete/i }).click();
  });
});
