const Employee = require("../lib/Employee");

test("New employee addition", () => {
  const e = new Employee();
  expect(typeof(e)).toBe("object");
});

test("constructor argument for name", () => {
  const name = "Matthew";
  const e = new Employee(name);
  expect(e.name).toBe(name);
});

test("constructor argument for Id", () => {
  const testValue = 50;
  const e = new Employee("Be", testValue);
  expect(e.id).toBe(testValue);
});

test("constructor argument for email", () => {
  const testValue = "123@yahoo.com";
  const e = new Employee("Be", 1, testValue);
  expect(e.email).toBe(testValue);
});

test("getName() should get string", () => {
  const testValue = "Matthew";
  const e = new Employee(testValue);
  expect(e.getName()).toBe(testValue);
});

test("getId() should get #/value", () => {
  const testValue = 100;
  const e = new Employee("Be", testValue);
  expect(e.getId()).toBe(testValue);
});

test("getEmail() should get link", () => {
  const testValue = "123@yahoo.com";
  const e = new Employee("Be", 1, testValue);
  expect(e.getEmail()).toBe(testValue);
});

test("getRole() should return \"Employee\"", () => {
  const testValue = "Employee";
  const e = new Employee("Matthew", 1, "123@yahoo.com");
  expect(e.getRole()).toBe(testValue);
});