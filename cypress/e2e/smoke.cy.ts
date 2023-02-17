import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  const testNote = {
    title: faker.lorem.words(1),
    body: faker.lorem.sentences(1)
  };

  const testBoard = {
    title: faker.lorem.words(1)
  };

  beforeEach(() => { });
  afterEach(() => { });

  it("should allow you to view notes", () => {
    cy.visitAndCheck("/admin");

    cy.findByRole("link", { name: /notes/i }).click();
    cy.findByText(/No note selected/); // substring match
  });

  it("should allow you to view boards", () => {
    cy.visitAndCheck("/admin");

    cy.findByRole("link", { name: /boards/i }).click();
    cy.findByText(/No board selected/);
  });

  it("should allow you to create a board", () => {
    cy.visitAndCheck("/admin");

    cy.findByRole("link", { name: /boards/i }).click();
    cy.findByText(/No board selected/);

    cy.findByRole("link", { name: /\+ new board/i }).click();

    cy.findByRole("textbox", { name: /title/i }).type(testBoard.title);
    cy.findByRole("button", { name: /save/i }).click();

    cy.findByRole("button", { name: /delete/i }).click();

    cy.findByText(/No board selected/);
  });

  it("should allow you to create a board and a note", () => {
    cy.visitAndCheck("/admin");

    cy.findByRole("link", { name: /boards/i }).click();
    cy.findByText(/No board selected/);

    cy.findByRole("link", { name: /\+ new board/i }).click();

    cy.findByRole("textbox", { name: /title/i }).type(testBoard.title);
    cy.findByRole("button", { name: /save/i }).click();

    cy.contains("Create a new note in this board").click();

    cy.findByRole("textbox", { name: /title/i }).type(testNote.title);
    cy.findByRole("textbox", { name: /message/i }).type(testNote.body);
    cy.findByRole("button", { name: /save/i }).click();

    cy.findAllByText(testNote.title);

    cy.visitAndCheck("/admin");
    cy.findByRole("link", { name: /boards/i }).click();

    cy.findByText(testBoard.title, { exact: false }).click();
    cy.findByRole("button", { name: /delete/i }).click();

    cy.findByText(/No board selected/);

    cy.visitAndCheck("/admin");
    cy.findByRole("link", { name: /notes/i }).click();
    cy.contains(testNote.title).click();

    cy.findByRole("button", { name: /delete/i }).click();
  });
});
