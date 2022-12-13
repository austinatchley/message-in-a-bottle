import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  const mockXPos: number = 1;
  const mockYPos: number = 2;

  beforeEach(() => {});
  afterEach(() => {});

  it("should allow you to make a note", () => {
    const testNote = {
      title: faker.lorem.words(1),
      body: faker.lorem.sentences(1),
      xpos: mockXPos,
      ypos: mockYPos
    };
    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /notes/i }).click();
    cy.findByText("No notes yet");

    cy.findByRole("link", { name: /\+ new note/i }).click();

    cy.findByRole("textbox", { name: /title/i }).type(testNote.title);
    cy.findByRole("textbox", { name: /body/i }).type(testNote.body);
    cy.findByRole("textbox", { name: /xpos/i }).type("" + testNote.xpos);
    cy.findByRole("textbox", { name: /ypos/i }).type("" + testNote.ypos);
    cy.findByRole("button", { name: /save/i }).click();

    cy.findByRole("button", { name: /delete/i }).click();

    cy.findByText("No notes yet");
  });
});
