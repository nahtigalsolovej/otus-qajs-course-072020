const axios = require('axios');
const assert = require('assert');

Feature('API testing');

Scenario('Create 3 users', async ( I) => {
  const data = [
    {
      "id": 1111,
      "username": "tester1",
      "firstName": "Ann",
      "lastName": "Sokolova",
      "email": "tester1@test.com",
      "password": "123456",
      "phone": "89564555555",
      "userStatus": 1
    },
    {
      "id": 2222,
      "username": "tester2",
      "firstName": "Mary",
      "lastName": "Ivanova",
      "email": "tester2@test.com",
      "password": "654123",
      "phone": "89664355645",
      "userStatus": 2
    },
    {
      "id": 3333,
      "username": "tester3",
      "firstName": "Andy",
      "lastName": "Petrov",
      "email": "tester3@test.com",
      "password": "145236",
      "phone": "89335656699",
      "userStatus": 1
    },
  ];

  const request = await axios.post('https://petstore.swagger.io/v2/user/createWithList', data);
  assert.deepStrictEqual(request.status, 200);
});

Scenario('Get user by name', async ( I) => {
  const request = await axios.get('https://petstore.swagger.io/v2/user/tester2');
  assert.deepStrictEqual(request.status, 200);
  assert.deepStrictEqual(
      request.data,
      {
        id: 2222,
        username: 'tester2',
        firstName: 'Mary',
        lastName: 'Ivanova',
        email: 'tester2@test.com',
        password: '654123',
        phone: '89664355645',
        userStatus: 2
      }
  );
});

Scenario('Login user into the system', async ( I) => {
  const request = await axios.get('https://petstore.swagger.io/v2/user/login?username=tester1&password=123456');
  assert.deepStrictEqual(request.status, 200);
  assert.match(request.data.message, /logged in user session:/);
});

Scenario('Update user info', async ( I) => {
  const request = await axios.put(
      'https://petstore.swagger.io/v2/user/tester2',
      {
          id: 2222,
          username: "tester2",
          firstName: "Mary",
          lastName: "Sidorova",
          email: "tester2Updated@test.com",
          password: "654123",
          phone: "89664355645",
          userStatus: 2
      }
  );
  assert.deepStrictEqual(request.status, 200);
});

Scenario('Delete user', async ( I) => {
    const user = 'tester3';
    const request = await axios.delete(`https://petstore.swagger.io/v2/user/${user}`);
    assert.deepStrictEqual(request.status, 200);
    assert.deepStrictEqual(request.data.message, user);
});
