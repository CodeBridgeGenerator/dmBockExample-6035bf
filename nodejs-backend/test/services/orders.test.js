const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("orders service", async () => {
  let thisService;
  let orderCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("orders");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (orders)");
  });

  describe("#create", () => {
    const options = {"product":"new value","qty":23,"price":23};

    beforeEach(async () => {
      orderCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new order", () => {
      assert.strictEqual(orderCreated.product, options.product);
assert.strictEqual(orderCreated.qty, options.qty);
assert.strictEqual(orderCreated.price, options.price);
    });
  });

  describe("#get", () => {
    it("should retrieve a order by ID", async () => {
      const retrieved = await thisService.Model.findById(orderCreated._id);
      assert.strictEqual(retrieved._id.toString(), orderCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"product":"updated value","qty":100,"price":100};

    it("should update an existing order ", async () => {
      const orderUpdated = await thisService.Model.findByIdAndUpdate(
        orderCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(orderUpdated.product, options.product);
assert.strictEqual(orderUpdated.qty, options.qty);
assert.strictEqual(orderUpdated.price, options.price);
    });
  });

  describe("#delete", async () => {
    it("should delete a order", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const orderDeleted = await thisService.Model.findByIdAndDelete(orderCreated._id);
      assert.strictEqual(orderDeleted._id.toString(), orderCreated._id.toString());
    });
  });
});