import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  const testNote = {
    title: faker.lorem.words(1),
    body: faker.lorem.sentences(1),
  };

  const testBottle = {
    title: faker.lorem.words(1),
  };

  beforeEach(() => {});
  afterEach(() => {});

  it("should allow you to view notes", () => {
    cy.visitAndCheck("/admin");

    cy.findByRole("link", { name: /notes/i }).click();
    cy.findByText(/No note selected/); // substring match
  });

  it("should allow you to create a note", () => {
    cy.visitAndCheck("/bottle");

    cy.findByRole("link", { name: /Put/i }).click();

    cy.findByRole("textbox", { name: /title/i }).type(testNote.title);
    cy.findByRole("textbox", { name: /message/i }).type(testNote.body);
    cy.findByRole("button", { name: /save/i }).click();

    cy.visitAndCheck("/admin");
    cy.findByRole("link", { name: /notes/i }).click();
    cy.contains(testNote.title).click();

    cy.findByRole("button", { name: /delete/i }).click();
  });
});
