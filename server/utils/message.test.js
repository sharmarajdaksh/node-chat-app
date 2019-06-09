const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {

    const from = "Nibba";
    const text = "Some Message";

    it('should generate correct message object', () => {
        message = generateMessage(from, text)
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message).toHaveProperty('createdAt');
        expect(typeof message.createdAt).toBe('number');
    });

});