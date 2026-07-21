const request = require("supertest")
const app = require("../server")
const mongodb = require("../data/database")

// This connects to MongoDB before the tests start
beforeAll(async () => {
  await mongodb.initDb()
})

// This closes MongoDB after all tests finish
afterAll(async () => {
  await mongodb.closeDb()
})

// This checks that the main HomeFix API route is working
describe("HomeFix API", () => {
  test("GET / should return a success message", async () => {
    const response = await request(app).get("/")

    expect(response.statusCode).toBe(200)
    expect(response.text).toBe("HomeFix API routes are working")
  })
})

// This checks that all homes can be returned
test("GET /homes should return status 200", async () => {
  const response = await request(app).get("/homes")

  expect(response.statusCode).toBe(200)
})
