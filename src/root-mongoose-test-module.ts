import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { randomBytes } from "crypto";

let mongod: MongoMemoryServer;

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) => MongooseModule.forRootAsync({
  useFactory: async () => {
    mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();
    return {
      uri: mongoUri,
      ...options,
    }
  },
});

export const randfloat = (length: number = 1) => Math.random() * length;
export const randint = (length: number = 1) => Math.floor(randfloat(length));
export const randstr = (length: number = 20) => randomBytes(length).toString('hex');

export const closeInMongodConnection = async () => {
  if (mongod) await mongod.stop();
}
