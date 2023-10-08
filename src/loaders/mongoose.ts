import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../../config';

export default async (): Promise<Db> => {

mongoose.set('strictQuery', false);
  try {
    const connection = await mongoose.connect(config.databaseURL);
    console.log('Connected to MongoDB');
    return connection.connection.db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }


  // const connection = await mongoose.connect(config.databaseURL);
  // return connection.connection.db;
};
