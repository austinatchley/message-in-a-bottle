import { faker } from "@faker-js/faker";

const LOCAL_ADMIN_PASSWORD = "local";

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

  it("should allow you to create a note", () => {
    cy.visitAndCheck("/bottle");

    cy.findByRole("link", { name: /Put/i }).click();

    cy.findByRole("textbox", { name: /title/i }).type(testNote.title);
    cy.findByRole("textbox", { name: /message/i }).type(testNote.body);
    cy.findByRole("button", { name: /save/i }).click();

    enterAdminNotesView();
    cy.contains(testNote.title).click();

    cy.findByRole("button", { name: /delete/i }).click();
  });
});

function enterAdminNotesView() {
  cy.visitAndCheck("/admin");
  cy.findByRole("textbox", { name: /password/i }).type(LOCAL_ADMIN_PASSWORD);
  cy.findByRole("button", { name: /enter/i }).click();
}
