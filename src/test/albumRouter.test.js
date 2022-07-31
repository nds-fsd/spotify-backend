const { describe } = require("jest-circus");
const supertest = require("supertest");
const { app, server } = require("../index");
const fakeRequest = supertest(app);
const { connectDB, disconnectDB } = require("../mongo");
const { generateJWT } = require("../mongo/Schema/User/User");
const { createUser } = require("./testUtils");

describe("ALBUM Router TEST", () => {
  beforeAll(async () => {
    const connectionError = await connectDB();
    if (connectionError) console.log(connectionError);
  });
  afterAll(async () => {
    await disconnectDB();
    server.close();
  });

  let album;
  let adminUser;

  const user = createUser();

  const adminHeaders = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + generateJWT(adminUser),
  };

  const userHeaders = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + generateJWT(user),
  };

  describe("Find admin", () => {
    it("ADMIN user exists", async () => {
      adminUser = await User.findOne({ role: "ADMIN" });
      expect(adminUser).toBeDefined();
      expect(adminUser.email).toBe("admin@tasker.com");
      adminHeaders = {
        Authorization: "Bearer " + generateJWT(adminUser),
      };
    });
  });

  describe("POST / album", () => {
    it("ADMIN can create new ALBUM", async () => {
      const res = await fakeRequest.post("/album").set(adminHeaders).send({
        name: "Bachata Rosa",
        photo: "",
        songs: [],
        artists: "Juan Luis Guerra",
        releaseYear: "1990",
      });
      expect(res.status).toBe(201);
      expect(res.body.name).toBe("Bachata Rosa");
      expect(res.body.songs).toStrictEqual([]);
      expect(res.body.photo).toBeDefined();
      expect(res.body.artists).toBe("Juan Luis Guerra");
      expect(res.body.releaseYear).toBe("1990");
      album = res.body;
    });

    it("USER can not create a new ALBUM", async () => {
      const res = await fakeRequest.post("/album").set(userHeaders).send({
        name: "Entre mar y palmeras",
        photo: "",
        songs: [],
        artists: "Juan Luis Guerra",
        releaseYear: "2022",
      });
      expect(res.status).toBe(403);
    });
  });

  describe("GET /album", () => {
    it("USER can GET ALL albums", async () => {
      const res = await fakeRequest.get("/album").set(userHeaders).send();
      expect(res.status).toBe(200);
    });

    it("USER can GET ONE album", async () => {
      const res = await fakeRequest
        .get(`/album/${album._id}`)
        .set(userHeaders)
        .send();
      expect(res.status).toBe(200);
      expect(res.body.name).toBe("Bachata Rosa");
      expect(res.body.songs).toStrictEqual([]);
      expect(res.body.photo).toBeDefined();
      expect(res.body.artists).toBe("Juan Luis Guerra");
      expect(res.body.releaseYear).toBe("1990");
      album = res.body;
    });
  });

  describe("PATCH / album", () => {
    it("ADMIN can MODIFY an album", async () => {
      const res = await fakeRequest
        .patch(`/album/${album._id}`)
        .set(adminHeaders)
        .send();
      expect(res.status).toBe(200);
    });

    it("USER can not MODIFY an album", async () => {
      const res = await fakeRequest
        .patch(`/album/${album._id}`)
        .set(userHeaders)
        .send();
      expect(res.status).toBe(403);
    });
  });

  describe("DELETE / album", () => {
    it("ADMIN can DELETE an album", async () => {
      const res = await fakeRequest
        .delete(`/album/${album._id}`)
        .set(adminHeaders)
        .send();
      expect(res.status).toBe(200);
    });

    it("USER can not DELETE an album", async () => {
      const res = await fakeRequest
        .delete(`/album/${album._id}`)
        .set(userHeaders)
        .send();
      expect(res.status).toBe(403);
    });
  });
});
