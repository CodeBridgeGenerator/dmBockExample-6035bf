
    module.exports = function (app) {
        const modelName = "products";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , maxLength: 150, index: true, trim: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
sku: { type:  String , comment: "SKU, p, false, true, true, true, true, true, true, , , , ," },
category: { type: Schema.Types.ObjectId, ref: "category", comment: "Category, dropdown, false, true, true, true, true, true, true, category, category, one-to-one, name," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };