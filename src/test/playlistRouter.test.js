const supertest = require("supertest");
const { app, server } = require("../index");
const fakeRequest = supertest(app);
const { connectDB, disconnectDB } = require("../mongo");
const { Playlist } = require("../mongo/Schema/Playlist/playlist");
const { generateJWT } = require("../mongo/Schema/User/User");
const { createUser } = require("./testUtils");

describe("Playlist Router TEST", () => {
  beforeAll(async () => {
    const connectionError = await connectDB();
    if (connectionError) console.log(connectionError);
  });
  afterAll(async () => {
    await disconnectDB();
    server.close();
  });

  let playlist;

  const user = createUser();

  const userHeaders = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + generateJWT(user),
  };

  describe("POST / playlist", () => {
    it("User can post a playlist", async () => {
      const res = await fakeRequest.post("/playlist").set(userHeaders).send({
        name: "Hola playlist",
        songs: [],
      });
      expect(res.status).toBe(201);
      expect(res.body.name).toBe("Hola playlist");
      expect(res.body.songs).toStrictEqual([]);
      playlist = res.body;
    });
  });

  describe("GET / playlist", () => {
    it("User can get ALL playlist", async () => {
      const res = await fakeRequest.get("/playlist").set(userHeaders).send();
      expect(res.status).toBe(200);
    });

    it("User can get ONE playlist", async () => {
      const res = await fakeRequest
        .get(`/playlist/${playlist._id}`)
        .set(userHeaders)
        .send();
      expect(res.status).toBe(200);
      expect(res.body.name).toBe("Hola playlist");
      expect(res.body.songs).toStrictEqual([]);
      playlist = res.body;
    });
  });

  describe("PATCH / playlist", () => {
    it("User can modify a playlist", async () => {
      const res = await fakeRequest.patch("/playlist/id").send();
    });
  });

  describe("DELETE / playlist", () => {
    it("User can delete a playlist", async () => {
      const res = await fakeRequest.delete("/playlist/id").send();
    });
  });
});
