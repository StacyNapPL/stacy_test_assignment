import * as supertest from 'supertest';
const request = supertest('https://gorest.co.in/');
const token = '5d7768e53f59b7c9573ef21657a31920b306738863f5d28b95cfc91e46f0f6c1';


describe('Tests', () => {
  let userId;
  describe('Read all users request', () => {
    it('GET List of all users', async () => {
      const res = await request
        .get('/public/v2/users')
        .set("Authorization", "Bearer " + token)
      expect(res.statusCode).toBe(200)
    })
  });

  describe('Create & Read user requests', () => {
    it('POST Create a user', async () => {
      const data = {
        name: 'Stacy Test',
        gender: 'female',
        email: Math.floor(Math.random() * 100000) + '@test.stacy',
        status: 'active'
      }

      const res = await request
        .post('/public/v2/users')
        .send(data)
        .set("Authorization", "Bearer " + token)
      expect(res.body.name).toBe(data.name);
      expect(res.statusCode).toBe(201)

      userId = res.body.id;
    })
    it('GET Single user details', async () => {
      const res = await request
        .get('/public/v2/users/' + userId._id)
        .set("Authorization", "Bearer " + token)
      expect(res.body.id).toBe(userId.id)
    });
  });

  describe('Update user request', () => {
    it('PUT Update user', async () => {
      const data = {
        name: 'Stacy Test Edited',
        gender: 'male',
        email: Math.floor(Math.random() * 100000) + '@test.stacy',
        status: 'active'
      }

      //const getRes = await request.get('/public/v2/users/' + userId._id);
      //const beforeName = userId.body.name;
      //const beforeGender = userId.body.gender;

      const res = await request
        .put('/public/v2/users/' + userId)
        .send(data)
        .set("Authorization", "Bearer " + token)
      console.log(res.body);
      //expect(res.body.name).not.toBe(beforeName); // null
      //expect(userId.body.name).toBe(data.name);
      //expect(res.body.gender).not.toBe(beforeGender); // null
      //expect(userId.body.gender).toBe(data.gender);
      expect(res.statusCode).toBe(200)
    });
  });

describe('Create & Delete user request', () => {
  it('DELETE User', async () => {
    const res = await request
      .delete('/public/v2/users/' + userId)
      .set("Authorization", "Bearer " + token)
    console.log(res.body);
    expect(res.statusCode).toBe(204)
    expect(res.body).toEqual({})
  })
  });
})