const request = require("supertest")
const app = require("../server")

// This checks that the main HomeFix API route is working
describe("HomeFix API", () => {
  test("GET / should return a success message", async () => {
    const response = await request(app).get("/")

    expect(response.statusCode).toBe(200)
    expect(response.text).toBe("HomeFix API routes are working")
  })
})