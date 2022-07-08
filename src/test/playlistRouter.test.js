const { beforeAll, afterAll, it, describe } = require("jest-circus");
const supertest = require("supertest");
const { app, server } = require("../index");
const fakeRequest = supertest(app);
const { connectDB, disconnectDB } = require("../mongo");
const { Playlist } = require("../mongo/Schema/Playlist/playlist");

describe("Playlist Router TEST", () => {
    beforeAll(async () => {
        const connectionError = await connectDB();
        if (connectionError) console.log(connectionError);
    })
    afterAll(async, () => {
        await disconnectDB();
        server.close();
    });

    let playlist;

    describe("POST / playlist", () => {
        it("User can post a playlist", async() => {
            const res = await fakeRequest.post("/playlist").send({
                name: "Hola playlist",
                songs: []
            });
            expect(res.status).toBe(200);
            expect(res.body.name).toBe("Hola playlist");
            expect(res.body.songs).toBe([])
            playlist = res.body;
        })
    })
    

    describe("GET / playlist", () => {
        it("User can get ALL playlist", async() => {
            const res = await fakeRequest.get("/playlist").send();
            expect(res.status).toBe(200);
        })
    })

    describe("GET id / playlist", () => {
        it("User can get ONE playlist", async() => {
            const res = await fakeRequest.get("playlist/:id").send();
            expect(res.status).toBe(200);
            expect(res.body.name).toBe("Hola playlist");
            expect(res.body.songs).toBe([]);
            playlist= res.body
        })
    })


    describe("PATCH / playlist", () => {
        it("User can modify a playlist", async() => {
            const res = await fakeRequest.patch("/playlist/id").send()

        })
    })

    describe("DELETE / playlist", () => {
        it("User can delete a playlist", () => {
            const res = await fakeRequest.delete("/playlist/id").send()
        })
    })
    
   







})