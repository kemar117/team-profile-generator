const Intern = require("../lib/Intern");

test("constructor set school name", () => {
  const testValue = "Florida State University";
  const e = new Intern("Be", 1, "123@yahoo.com", testValue);
  expect(e.school).toBe(testValue);
});

test("getRole() must return string", () => {
  const testValue = "Intern";
  const e = new Intern("Be", 1, "123@yahoo.com", "Florida State University");
  expect(e.getRole()).toBe(testValue);
});

test("getSchool() must return string", () => {
  const testValue = "Florida State University";
  const e = new Intern("Be", 1, "123@yahoo.com", testValue);
  expect(e.getSchool()).toBe(testValue);
});