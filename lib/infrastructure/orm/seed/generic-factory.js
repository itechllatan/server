import { getRepository } from 'typeorm';

class GenericFactory {
  static build(attrs = {}, schema) {
    return getRepository(schema)
      .create(attrs);
  }

  static async create(objects, schema) {
    return getRepository(schema)
      .insert(objects);
  }
}
export default GenericFactory;
