const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

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

describe('generateLocationMessage', () => {

    const from = "Nibba";
    const latitude = 121.345;
    const longitude = -123.455;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    it('should generate correct location object', () => {
        message = generateLocationMessage(from, latitude, longitude)
        expect(message.from).toBe(from);
        expect(message.url).toBe(url);
        expect(message).toHaveProperty('createdAt');
        expect(typeof message.createdAt).toBe('number');
    });

});