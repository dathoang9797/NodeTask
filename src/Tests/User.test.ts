import request from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import app from '@App/app';
import { UserModel } from '@App/Models/UserModels';

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: "Marco",
    email: "marco@email",
    password: "nodeDeveloper",
    tokens: [
        {
            token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
        }
    ]
};

beforeEach(async () => {
    // Before any single test
    await UserModel.deleteMany();
    await new UserModel(userOne).save();
});

beforeAll(() => {
    // Before all tests
});

afterEach(() => {
    // After any single test
});

afterAll(() => {
    // After all tests
});

test("Should signup a new user", async () => {
    const response = await request(app)
        .post("/users")
        .send({
            name: "Marco2",
            email: "marco@email2",
            password: "nodeDeveloper2"
        })
        .expect(201);

    const user = await UserModel.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body.user.name).toMatchObject({
        name: "Marco2",
        email: "marco@email2"
    });
    expect(user.password).not.toBe("nodeDeveloper2");
});

test("Should login existing user", async () => {
    await request(app)
        .post("/users/login")
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(201);
});

test("Should get profile for a user", async () => {
    await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(201);
});