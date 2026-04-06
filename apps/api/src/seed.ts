import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const password = await bcrypt.hash('password123', 10);

  // --- Users ---
  const [p1, p2, p3, d1, d2, d3] = await Promise.all([
    prisma.user.upsert({
      where: { email: 'aryan@goticket.com' },
      update: {},
      create: { name: 'Aryan Sharma', email: 'aryan@goticket.com', password, role: 'passenger' },
    }),
    prisma.user.upsert({
      where: { email: 'priya@goticket.com' },
      update: {},
      create: { name: 'Priya Mehta', email: 'priya@goticket.com', password, role: 'passenger' },
    }),
    prisma.user.upsert({
      where: { email: 'rahul@goticket.com' },
      update: {},
      create: { name: 'Rahul Verma', email: 'rahul@goticket.com', password, role: 'passenger' },
    }),
    prisma.user.upsert({
      where: { email: 'suresh@goticket.com' },
      update: {},
      create: { name: 'Suresh Kumar', email: 'suresh@goticket.com', password, role: 'driver', vehicleNumber: 'DL 01 AB 1234' },
    }),
    prisma.user.upsert({
      where: { email: 'vikram@goticket.com' },
      update: {},
      create: { name: 'Vikram Singh', email: 'vikram@goticket.com', password, role: 'driver', vehicleNumber: 'MH 02 CD 5678' },
    }),
    prisma.user.upsert({
      where: { email: 'neha@goticket.com' },
      update: {},
      create: { name: 'Neha Gupta', email: 'neha@goticket.com', password, role: 'driver', vehicleNumber: 'KA 03 EF 9012' },
    }),
  ]);

  console.log('✓ Created 6 users (3 passengers, 3 drivers)');

  // --- Tickets ---
  const routes = [
    { source: 'Connaught Place, New Delhi', destination: 'Saket, New Delhi', type: 'Bus (AC)', price: 45 },
    { source: 'Bandra, Mumbai', destination: 'Andheri, Mumbai', type: 'Bus (Non-AC)', price: 18 },
    { source: 'Koramangala, Bengaluru', destination: 'Indiranagar, Bengaluru', type: 'Bike Taxi', price: 64 },
    { source: 'Salt Lake, Kolkata', destination: 'Park Street, Kolkata', type: 'Cab', price: 120 },
    { source: 'Sector 17, Chandigarh', destination: 'Sector 43, Chandigarh', type: 'Bus (Non-AC)', price: 12 },
    { source: 'Adyar, Chennai', destination: 'T. Nagar, Chennai', type: 'Bus (AC)', price: 30 },
    { source: 'Jubilee Hills, Hyderabad', destination: 'Hitech City, Hyderabad', type: 'Cab', price: 95 },
    { source: 'Aundh, Pune', destination: 'Hinjewadi, Pune', type: 'Bike Taxi', price: 72 },
    { source: 'Vastrapur, Ahmedabad', destination: 'Bopal, Ahmedabad', type: 'Bus (AC)', price: 20 },
    { source: 'Gomti Nagar, Lucknow', destination: 'Hazratganj, Lucknow', type: 'Cab', price: 85 },
    { source: 'Karol Bagh, New Delhi', destination: 'Lajpat Nagar, New Delhi', type: 'Bike Taxi', price: 56 },
    { source: 'Powai, Mumbai', destination: 'Kurla, Mumbai', type: 'Bus (Non-AC)', price: 15 },
  ];

  const passengers = [p1, p2, p3];
  const daysAgo = (n: number) => new Date(Date.now() - n * 86400000);

  const tickets = routes.map((route, i) => ({
    ...route,
    userId: passengers[i % 3].id,
    date: daysAgo(i * 3),
    status: i < 9 ? 'active' : 'completed',
  }));

  await prisma.ticket.createMany({ data: tickets });

  console.log(`✓ Created ${tickets.length} tickets`);
  console.log('\nAll seed users use password: password123');
  console.log('\nPassengers:');
  console.log('  aryan@goticket.com');
  console.log('  priya@goticket.com');
  console.log('  rahul@goticket.com');
  console.log('\nDrivers:');
  console.log('  suresh@goticket.com');
  console.log('  vikram@goticket.com');
  console.log('  neha@goticket.com');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
