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
    cy.wait(2000);
    cy.contains(testNote.title).click();

    cy.wait(2000);
    cy.findByRole("button", { name: /delete/i }).click();
  });

  it("should not allow unauthenticated visitors to access admin view", () => {
    cy.visit("/admin/notes");
    cy.findByText("Password"); // Redirected to /admin to enter password
  });
});

function enterAdminNotesView() {
  cy.visitAndCheck("/admin");
  cy.findByRole("textbox", { name: /password/i }).type(LOCAL_ADMIN_PASSWORD);
  cy.findByRole("button", { name: /enter/i }).click();
}
