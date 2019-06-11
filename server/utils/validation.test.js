const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {

    it('should reject non-string values', () => {
        const ret = isRealString(23312);
        expect(ret).toBe(false);
    });

    it('should reject string with only spaces', () => {
        const ret = isRealString('  ');
        expect(ret).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        const ret = isRealString('  xyz ');
        expect(ret).toBe(true);
    });
});