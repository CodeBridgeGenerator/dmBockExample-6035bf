
    module.exports = function (app) {
        const modelName = "orders";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            product: { type:  String , comment: "Product, p, false, true, true, true, true, true, true, , , , ," },
qty: { type: Number, comment: "QTY, badge, false, true, true, true, true, true, true, , , , ," },
price: { type: Number, comment: "Price, currency, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };