const Manager = require("../lib/Manager");

test("class should get assigned #", () => {
  const testValue = 100;
  const e = new Manager("Be", 1, "123@yahoo.com", testValue);
  expect(e.officeNumber).toBe(testValue);
});

test("getRole() must return Manager", () => {
  const testValue = "Manager";
  const e = new Manager("Be", 1, "123@yahoo.com", 100);
  expect(e.getRole()).toBe(testValue);
});

test("getOffice() must get #/value", () => {
  const testValue = 100;
  const e = new Manager("Be", 1, "123@yahoo.com", testValue);
  expect(e.getOfficeNumber()).toBe(testValue);
});