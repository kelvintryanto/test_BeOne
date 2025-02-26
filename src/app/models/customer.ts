import { connectToDatabase } from "@/config/config";
import { CreateCustomer, Customer } from "@/types";
import { Db, ObjectId } from "mongodb";
import { comparePass, hashPass } from "../utils/bcrypt";

const DATABASE_NAME = "BeOne";
const COLLECTION = "customers";

export const getDb = async () => {
  const client = await connectToDatabase();
  const db: Db = client.db(DATABASE_NAME);
  return db;
};

export const createCustomer = async (customer: CreateCustomer) => {
  const db = await getDb();
  try {
    const now = new Date().toISOString();
    const collection = db.collection<Customer>(COLLECTION);

    const hashedPassword = await hashPass(customer.password);

    const result = await collection.insertOne({
      ...customer,
      _id: new ObjectId(),
      password: hashedPassword,
      points: 0,
      createdAt: now,
      updatedAt: now,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getCustomerByEmail = async (email: string) => {
  const db = await getDb();
  return db.collection<Customer>(COLLECTION).findOne({ email });
};

export const verifyCustomerPassword = async (
  email: string,
  password: string
) => {
  const customer = await getCustomerByEmail(email);
  if (!customer || !customer.password) return false;
  return comparePass(password, customer.password);
};

export const getAllCustomers = async () => {
  const db = await getDb();
  return db.collection<Customer>(COLLECTION).find().toArray();
};
