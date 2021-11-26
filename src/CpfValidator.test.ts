import CpfValidator from "./CpfValidator";

test("Should be false if cpf is empty", function () {
    const cpfValidator = new CpfValidator('');
    expect(cpfValidator.validate()).toBeFalsy();
});

test("Should be false if cpf is lower than 11", function () {
    const cpfValidator = new CpfValidator('123456');
    expect(cpfValidator.validate()).toBeFalsy();
});

test("Should be false if cpf is greater than 14", function () {
    const cpfValidator = new CpfValidator('123456789101536');
    expect(cpfValidator.validate()).toBeFalsy();
});

test("Should be false if all cpf's digits are equals", function () {
    const cpfValidator = new CpfValidator('99999999999');
    expect(cpfValidator.validate()).toBeFalsy();
});

test("Should be false if a cpf is invalid", function () {
    const cpfValidator = new CpfValidator('123.456.789-10');
    expect(cpfValidator.validate()).toBeFalsy();

});

test("Should be true if a cpf is valid for rest lower than 2", function () {
    const cpfValidator = new CpfValidator('709.655.290-10');
    expect(cpfValidator.validate()).toBeTruthy();
});

test("Should be true if a cpf is valid for rest equal or greater than 2", function () {
    const cpfValidator = new CpfValidator('105.130.180-77');
    expect(cpfValidator.validate()).toBeTruthy();
});