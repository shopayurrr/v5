import { db } from "./db";
import { users, accounts } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Add an admin user
  const [adminUser] = await db.insert(users).values({
    username: 'OPPATHEBEAR',
    password: '55Fp4MUtd22MRFr',
    firstName: 'ADMIN',
    lastName: 'USER',
    email: 'admin@wellsfargo.com',
    dateOfBirth: '01/01/1970',
    primaryPhone: '(000) 000-0000',
    secondaryPhone: '',
    address: 'HEADQUARTERS',
    permanentEmail: 'admin@wellsfargo.com',
    temporaryEmail: '',
    socialSecurityNumber: '000-00-0000',
    isAdmin: true
  }).onConflictDoNothing().returning();

  // Add a demo user
  const [demoUser] = await db.insert(users).values({
    username: 'dale',
    password: 'password',
    firstName: 'DALE',
    lastName: 'COOPER',
    email: 'dale.cooper@fbi.gov',
    dateOfBirth: '04/15/1890',
    primaryPhone: '(202) xxx-8573',
    secondaryPhone: '(202) xxx-9876',
    address: '000 MONTIFORE STREET, WASHINGTON, DC 20008',
    permanentEmail: 'dale.cooper@fbi.gov',
    temporaryEmail: 'dale.cooper@yahoo.com',
    socialSecurityNumber: 'xxx-xx-8573',
    isAdmin: false
  }).onConflictDoNothing().returning();

  if (demoUser) {
    // Add demo accounts
    await db.insert(accounts).values([
      {
        userId: demoUser.id,
        accountNumber: '12349876',
        accountType: 'Everyday Checking',
        balance: '45382.67'
      },
      {
        userId: demoUser.id,
        accountNumber: '12347654',
        accountType: 'Way2Save Savings',
        balance: '128456.93'
      },
      {
        userId: demoUser.id,
        accountNumber: '12345432',
        accountType: 'Active Cash Card',
        balance: '5000.00'
      }
    ]);
  }

  console.log("Seeding complete.");
}

seed().catch(console.error);
