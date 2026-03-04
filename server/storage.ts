import { users, accounts, type User, type InsertUser, type Account, type InsertAccount } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  deleteUser(id: number): Promise<boolean>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  getAccountsByUserId(userId: number): Promise<Account[]>;
  getAllUsers(): Promise<User[]>;
  createAccount(account: InsertAccount): Promise<Account>;
  deleteAccount(id: number): Promise<boolean>;
  updateAccountBalance(accountId: number, newBalance: string): Promise<Account | undefined>;
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values({
      ...insertUser,
      isAdmin: false,
      lastLoginTime: new Date(),
    }).returning();
    return user;
  }

  async deleteUser(id: number): Promise<boolean> {
    await db.delete(accounts).where(eq(accounts.userId, id));
    const [deleted] = await db.delete(users).where(eq(users.id, id)).returning();
    return !!deleted;
  }

  async updateUser(id: number, update: Partial<User>): Promise<User | undefined> {
    const [user] = await db.update(users).set(update).where(eq(users.id, id)).returning();
    return user;
  }

  async getAccountsByUserId(userId: number): Promise<Account[]> {
    return db.select().from(accounts).where(eq(accounts.userId, userId));
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  }

  async createAccount(insertAccount: InsertAccount): Promise<Account> {
    const [account] = await db.insert(accounts).values(insertAccount).returning();
    return account;
  }

  async deleteAccount(id: number): Promise<boolean> {
    const [deleted] = await db.delete(accounts).where(eq(accounts.id, id)).returning();
    return !!deleted;
  }

  async updateAccountBalance(accountId: number, newBalance: string): Promise<Account | undefined> {
    const [account] = await db.update(accounts).set({ balance: newBalance }).where(eq(accounts.id, accountId)).returning();
    return account;
  }
}

export const storage = new DatabaseStorage();
