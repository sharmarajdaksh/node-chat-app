const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Dean',
            room: 'Node Course'
        }, {
            id: '3',
            name: 'NiBBa',
            room: 'React Course'
        }] ;
    })

    it('should add new user', () => {
        const users = new Users();
        const user = {
            id: '123',
            name: 'Dex',
            room: 'New Room'
        };
        const resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        const user = users.removeUser('2');        
        expect(user.id).toBe('2');
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        const user = users.removeUser('9');        
        expect(user).toBe(undefined);
        expect(users.users.length).toBe(3);
    });

    it('should get a user', () => {
        const user = users.getUser('2');
        expect(user.id).toBe('2');
    });

    it('should not get a user', () => {
        const user = users.getUser('9');
        expect(user).toBe(undefined);
    });

    it('should get the user list for Node Course', () => {
        const userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Dean']);
    });

    it('should get the user list for React Course', () => {
        const userList = users.getUserList('React Course');
        expect(userList).toEqual(['NiBBa']);
    });
});