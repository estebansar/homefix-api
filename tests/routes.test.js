const request = require("supertest")
const app = require("../server")
const mongodb = require("../data/database")

let testHomeId
let testUserId

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

  // This checks that all homes are returned as JSON
  test("GET /homes should return a list of homes", async () => {
    const response = await request(app).get("/homes")

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

    // This creates a new home and saves its id for the next tests
  test("POST /homes should create a new home", async () => {
    const response = await request(app)
      .post("/homes")
      .send({
        ownerName: "Jest Test",
        address: "123 Test Street",
        city: "Lehi",
        state: "UT",
        zipCode: "84043",
        homeType: "House",
        yearBuilt: 2024,
        notes: "Created by Jest"
      })

    expect(response.statusCode).toBe(201)

    testHomeId = response.body.insertedId
    expect(testHomeId).toBeDefined()
  })

    // This checks that one home can be returned by id
  test("GET /homes/:id should return one home", async () => {
    const response = await request(app).get(`/homes/${testHomeId}`)

    expect(response.statusCode).toBe(200)
    expect(response.body._id).toBe(testHomeId)
    expect(response.body.ownerName).toBe("Jest Test")
  })

    // This checks that one home can be updated by id
  test("PUT /homes/:id should update one home", async () => {
    const response = await request(app)
      .put(`/homes/${testHomeId}`)
      .send({
        ownerName: "Jest Test Updated",
        address: "123 Test Street",
        city: "Lehi",
        state: "UT",
        zipCode: "84043",
        homeType: "House",
        yearBuilt: 2024,
        notes: "Updated by Jest"
      })

    expect(response.statusCode).toBe(204)
  })

    // This checks that one home can be deleted by id
  test("DELETE /homes/:id should delete one home", async () => {
    const response = await request(app).delete(`/homes/${testHomeId}`)

    expect(response.statusCode).toBe(204)
  })

  // This checks that all users are returned as JSON
  test("GET /users should return a list of users", async () => {
    const response = await request(app).get("/users")

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

    // This creates a new user and saves its id for the next tests
  test("POST /users should create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        firstName: "Jest",
        lastName: "User",
        email: "jestuser@example.com",
        phone: "801-555-0101"
      })

    expect(response.statusCode).toBe(201)

    testUserId = response.body.insertedId
    expect(testUserId).toBeDefined()
  })

    // This checks that one user can be returned by id
  test("GET /users/:id should return one user", async () => {
    const response = await request(app).get(`/users/${testUserId}`)

    expect(response.statusCode).toBe(200)
    expect(response.body._id).toBe(testUserId)
    expect(response.body.firstName).toBe("Jest")
  })

    // This checks that one user can be updated by id
  test("PUT /users/:id should update one user", async () => {
    const response = await request(app)
      .put(`/users/${testUserId}`)
      .send({
        firstName: "Updated",
        lastName: "User",
        email: "updateduser@example.com",
        phone: "801-555-0101"
      })

    expect(response.statusCode).toBe(204)
  })

    // This checks that one user can be deleted by id
  test("DELETE /users/:id should delete one user", async () => {
    const response = await request(app).delete(`/users/${testUserId}`)

    expect(response.statusCode).toBe(204)
  })
  



  // This checks that all maintenance tasks are returned as JSON
  test("GET /maintenanceTasks should return a list of maintenance tasks", async () => {
    const response = await request(app).get("/maintenanceTasks")

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  // This checks that all contractors are returned as JSON
  test("GET /contractors should return a list of contractors", async () => {
    const response = await request(app).get("/contractors")

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })
})