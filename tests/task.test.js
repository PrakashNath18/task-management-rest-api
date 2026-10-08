const dotenv = require("dotenv");
dotenv.config();

const request = require("supertest");
const app = require("../src/app");

describe("Task Manager API Tests", () => {

    test("GET / should return API running message", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);
        expect(response.body.message)
            .toBe("Task Manager API is running");
    });

    test("GET /api/tasks without token should return 401", async () => {
        const response = await request(app)
            .get("/api/tasks");

        expect(response.statusCode).toBe(401);
    });

    test("GET /api/tasks with invalid token should return 401", async () => {
        const response = await request(app)
            .get("/api/tasks")
            .set("Authorization", "Bearer abc123");

        expect(response.statusCode).toBe(401);
    });

});