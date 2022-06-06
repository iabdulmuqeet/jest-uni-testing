const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

// Individual tests - Ungrouped tests

// test('absolute - should return a positive number if input is postive', () => {
// 	const result = lib.absolute(1);
// 	expect(result).toBe(1);
// });

// test('absolute - should return a positive number if input is megative', () => {
// 	const result = lib.absolute(-1);
// 	expect(result).toBe(1);
// });

// test('absolute - should return 0 if input is 0', () => {
// 	const result = lib.absolute(0);
// 	expect(result).toBe(0);
// });

// Grouping tests

describe('absolute', () => {
	it('should return a positive number if input is postive', () => {
		const result = lib.absolute(1);
		expect(result).toBe(1);
	});

	it('should return a positive number if input is megative', () => {
		const result = lib.absolute(-1);
		expect(result).toBe(1);
	});

	it('should return 0 if input is 0', () => {
		const result = lib.absolute(0);
		expect(result).toBe(0);
	});
});

describe('greet', () => {
	it('should return a greeting message', () => {
		const result = lib.greet('Abdul Muqeet Arshad');
		// expect(result).toBe('Welcome Abdul Muqeet Arshad!');
		expect(result).toMatch(/Abdul Muqeet Arshad/);
		expect(result).toContain('Abdul Muqeet Arshad');
	});
});

describe('getCurrencies', () => {
	it('should return supported currencies', () => {
		const result = lib.getCurrencies(['USD', 'AUD', 'EUR']);

		// Proper Way
		expect(result).toContain('USD');
		expect(result).toContain('AUD');
		expect(result).toContain('EUR');

		// Ideal Way
		expect(result).toEqual(expect.arrayContaining(['AUD', 'EUR', 'USD']));
	});
});

describe('getProduct', () => {
	it('should return the product with the given id', () => {
		const result = lib.getProduct(1);

		// expect(result).toEqual({ id: 1, price: 10 });

		expect(result).toMatchObject({ id: 1, price: 10 });
		expect(result).toHaveProperty('id', 1);
	});
});

describe('registerUser', () => {
	it('should throw an error if the user is falsy', () => {
		const args = [null, undefined, false, 0, NaN, ''];

		args.forEach(a => expect(() => lib.registerUser(a)).toThrow());
	});

	it('should return the user object if valid username is passed', () => {
		const result = lib.registerUser('Abdul Muqeet Arshad');

		expect(result).toMatchObject({ username: 'Abdul Muqeet Arshad' });
		expect(result.id).toBeGreaterThan(0);
	});
});

describe('notifyCustomer', () => {
	it('should send an email to the customer', () => {
		// db.getCustomerSync = customerId => ({ email: 'a' });

		// let mailSent = false;

		// mail.send = (email, message) => (mailSent = true);
		// lib.notifyCustomer({ customerId: 1 });

		// expect(mailSent).toBe(true);

		db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
		mail.send = jest.fn();

		lib.notifyCustomer({ customerId: 1 });

		expect(mail.send).toHaveBeenCalled();
		expect(mail.send.mock.calls[0][0]).toBe('a');
		expect(mail.send.mock.calls[0][1]).toMatch(/order/);
	});
});
