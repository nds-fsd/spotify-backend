const supertest = require("supertest");
const { app, server } = require("../index");
const fakeRequest = supertest(app);
const { connectDB, disconnectDB } = require("../mongo");
const { User, generateJWT } = require("../mongo/Schema/User/User");

describe("Auth Router TEST", () => {
    beforeAll(async () => {
        const connectionError = await connectDB();
        if (connectionError) console.log(connectionError);
    });
    afterAll(async () => {
        await disconnectDB();
        server.close();
    });

    const email = 'test@test.com';
    const password = 'nuclio';

    describe("POST /register",  () => {
        it("Can register user", async () => {

            const res = await fakeRequest.post("/register").send({
                name: "TEST user",
                email,
                password,
            });
            expect(res.status).toBe(200);
            expect(res.body.token).toBeDefined();
            expect(res.body.user.id).toBeDefined();

        })

    });

    describe("POST /login",  () => {

        it("Can login user", async () => {
            const res = await fakeRequest.post("/login").send({
                email,
                password,
            });
            expect(res.status).toBe(200);
            expect(res.body.token).toBeDefined();
            expect(res.body.user.id).toBeDefined();
        })


    });


});
