import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocumnet } from './abstract.schema';

export abstract class AbstractRepository<TDocumnet> extends AbstractDocumnet {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocumnet>) {
    super();
  }

  async create(documnet: Omit<TDocumnet, '_id'>): Promise<TDocumnet> {
    const createdDocumnet = new this.model({
      ...documnet,
      _id: new Types.ObjectId(),
    });
    return (await createdDocumnet.save()).toJSON() as unknown as TDocumnet;
  }

  async findOne(filterQuery: FilterQuery<TDocumnet>): Promise<TDocumnet> {
    const documnet = await this.model
      .findOne(filterQuery)
      .lean<TDocumnet>(true);
    if (!documnet) {
      this.logger.warn(
        `Document not found with filter: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException('Document not found');
    }
    return documnet;
  }

  async findeOneAndUpdate(
    filterQuery: FilterQuery<TDocumnet>,
    update: UpdateQuery<TDocumnet>,
  ): Promise<TDocumnet> {
    const documnet = await this.model
      .findByIdAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocumnet>(true);
    if (!documnet) {
      this.logger.warn(
        `Document not found with filter: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException('Document not found');
    }
    return documnet;
  }

  async find(filterQuery: FilterQuery<TDocumnet>): Promise<TDocumnet[]> {
    return this.model.find(filterQuery).lean<TDocumnet[]>(true);
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocumnet>,
  ): Promise<TDocumnet> {
    const documnet = await this.model
      .findOneAndDelete(filterQuery)
      .lean<TDocumnet>(true);
    if (!documnet) {
      this.logger.warn(
        `Document not found with filter: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException('Document not found');
    }
    return documnet;
  }
}
