import { getRepository } from 'typeorm';

class CommonRepository {
  constructor(schema) {
    this.conn = getRepository(schema);
  }

  async findOne({ fields, relations, where, order }) {
    return await this.conn.findOne({
      relations,
      select: fields,
      where,
      order,
    });
  }

  async findOneWithRelations({ fields, relations, where }) {
    return await this.conn.findOne(where,
      {
        select: fields,
        relations,
      });
  }

  async findAll({ fields, where, order, skip, take, relations, join }) {
    return await this.conn.find({
      relations,
      join,
      select: fields,
      where,
      order,
      skip,
      take,
    });
  }

  async findAllWithRelations({ fields, relations, join, skip, where, take }) {
    return await this.conn.findAndCount({ where, select: fields, relations, skip, take, join });
  }

  async save(data, options) {
    return await this.conn.save(data,
      options);
  }

  async update(criteria, data) {
    return await this.conn.update(criteria,
      data);
  }

  async delete(id) {
    return await this.conn.delete(id);
  }
}

export default CommonRepository;
