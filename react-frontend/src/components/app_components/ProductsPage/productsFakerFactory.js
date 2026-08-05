
import { faker } from "@faker-js/faker";
export default (user,count,categoryIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.lorem.sentence(1),
sku: faker.lorem.sentence(""),
category: categoryIds[i % categoryIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
