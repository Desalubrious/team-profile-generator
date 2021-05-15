const Intern = require("../lib/intern");

test("Can set school via constructor", () => {
  const testValue = "DU";
  const e = new Intern("Evan", 1, "evan@test.com", testValue);
  expect(e.school).toBe(testValue);
});

test("getRole() should return \"Intern\"", () => {
  const testValue = "Intern";
  const e = new Intern("Evan", 1, "evan@test.com", "DU");
  expect(e.getRole()).toBe(testValue);
});

test("Can get school via getSchool()", () => {
  const testValue = "DU";
  const e = new Intern("Evan", 1, "evan@test.com", testValue);
  expect(e.getSchool()).toBe(testValue);
});