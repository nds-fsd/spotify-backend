const supertest = require("supertest");
const { app, server } = require("../index");
const fakeRequest = supertest(app);
const { connectDB, disconnectDB } = require("../mongo");
const { User, generateJWT } = require("../mongo/Schema/User/User");

describe("User Router TEST", () => {
  beforeAll(async () => {
    const connectionError = await connectDB();
    if (connectionError) console.log(connectionError);
  });
  afterAll(async () => {
    await disconnectDB();
    server.close();
  });

  let adminUser;
  let adminHeaders;

  it("ADMIN user exists", async () => {
    adminUser = await User.findOne({ role: "ADMIN" });
    expect(adminUser).toBeDefined();
    expect(adminUser.email).toBe("admin@tasker.com");
    adminHeaders = {
      Authorization: "Bearer " + generateJWT(adminUser),
    };
  });

  let normalUser;
  let normalUserHeaders;

  describe("POST /user", () => {
    it("ADMIN can create new USER", async () => {
      const res = await fakeRequest.post("/user").set(adminHeaders).send({
        name: "diogo",
        email: "jcano@nuclio.com",
        password: "nuclio",
      });
      expect(res.status).toBe(201);
      expect(res.body.name).toBe("diogo");
      expect(res.body.role).toBe("USER");
      expect(res.body.password).not.toBe("nuclio");
      normalUser = res.body;
      normalUserHeaders = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + generateJWT(normalUser),
      };
    });
  });

  it("USER can not create new USER", async () => {
    const res = await fakeRequest.post("/user").set(normalUserHeaders).send({
      name: "Alvaro",
      email: "jcano2@nuclio.com",
      password: "nuclio",
    });
    expect(res.status).toBe(403);
  });
});
