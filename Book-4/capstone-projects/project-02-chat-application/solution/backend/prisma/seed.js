import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  const hashedPassword = await bcrypt.hash('password123', 10)

  // Create users
  const alice = await prisma.user.upsert({
    where: { email: 'alice@chat.com' },
    update: {},
    create: {
      email: 'alice@chat.com',
      username: 'alice',
      password: hashedPassword,
      name: 'Alice Johnson',
      status: 'OFFLINE'
    }
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@chat.com' },
    update: {},
    create: {
      email: 'bob@chat.com',
      username: 'bob',
      password: hashedPassword,
      name: 'Bob Smith',
      status: 'OFFLINE'
    }
  })

  const charlie = await prisma.user.upsert({
    where: { email: 'charlie@chat.com' },
    update: {},
    create: {
      email: 'charlie@chat.com',
      username: 'charlie',
      password: hashedPassword,
      name: 'Charlie Brown',
      status: 'OFFLINE'
    }
  })

  console.log('✅ Users created')

  // Create channels
  const general = await prisma.channel.create({
    data: {
      name: 'general',
      description: 'General discussion channel',
      isPrivate: false,
      creatorId: alice.id,
      members: {
        create: [
          { userId: alice.id, role: 'ADMIN' },
          { userId: bob.id, role: 'MEMBER' },
          { userId: charlie.id, role: 'MEMBER' }
        ]
      }
    }
  })

  const random = await prisma.channel.create({
    data: {
      name: 'random',
      description: 'Random stuff',
      isPrivate: false,
      creatorId: bob.id,
      members: {
        create: [
          { userId: alice.id, role: 'MEMBER' },
          { userId: bob.id, role: 'ADMIN' }
        ]
      }
    }
  })

  const dev = await prisma.channel.create({
    data: {
      name: 'dev',
      description: 'Development discussions',
      isPrivate: false,
      creatorId: alice.id,
      members: {
        create: [
          { userId: alice.id, role: 'ADMIN' },
          { userId: charlie.id, role: 'MEMBER' }
        ]
      }
    }
  })

  console.log('✅ Channels created')

  // Create messages in general channel
  const msg1 = await prisma.message.create({
    data: {
      content: 'Welcome to the chat app! 👋',
      channelId: general.id,
      senderId: alice.id,
      type: 'TEXT'
    }
  })

  const msg2 = await prisma.message.create({
    data: {
      content: 'Thanks Alice! This is awesome!',
      channelId: general.id,
      senderId: bob.id,
      type: 'TEXT'
    }
  })

  await prisma.message.create({
    data: {
      content: 'Hey everyone! Happy to be here 😊',
      channelId: general.id,
      senderId: charlie.id,
      type: 'TEXT'
    }
  })

  // Create a reply (thread)
  await prisma.message.create({
    data: {
      content: 'Welcome Charlie!',
      channelId: general.id,
      senderId: alice.id,
      parentId: msg2.id,
      type: 'TEXT'
    }
  })

  // Messages in random channel
  await prisma.message.create({
    data: {
      content: 'What are you all working on today?',
      channelId: random.id,
      senderId: bob.id,
      type: 'TEXT'
    }
  })

  await prisma.message.create({
    data: {
      content: 'Building a chat app! How about you?',
      channelId: random.id,
      senderId: alice.id,
      type: 'TEXT'
    }
  })

  // Messages in dev channel
  await prisma.message.create({
    data: {
      content: 'Anyone tried the new React 19 features?',
      channelId: dev.id,
      senderId: charlie.id,
      type: 'TEXT'
    }
  })

  console.log('✅ Messages created')

  // Create some reactions
  await prisma.reaction.create({
    data: {
      emoji: '👍',
      messageId: msg1.id,
      userId: bob.id
    }
  })

  await prisma.reaction.create({
    data: {
      emoji: '❤️',
      messageId: msg1.id,
      userId: charlie.id
    }
  })

  await prisma.reaction.create({
    data: {
      emoji: '🎉',
      messageId: msg2.id,
      userId: alice.id
    }
  })

  console.log('✅ Reactions created')

  // Create some direct messages
  await prisma.directMessage.create({
    data: {
      content: 'Hey Bob, can you review my PR?',
      senderId: alice.id,
      recipientId: bob.id,
      type: 'TEXT'
    }
  })

  await prisma.directMessage.create({
    data: {
      content: 'Sure thing! Will take a look now.',
      senderId: bob.id,
      recipientId: alice.id,
      type: 'TEXT',
      read: false
    }
  })

  console.log('✅ Direct messages created')
  console.log('✅ Database seeded successfully!')
  console.log('\n📝 Test credentials:')
  console.log('   alice@chat.com / password123')
  console.log('   bob@chat.com / password123')
  console.log('   charlie@chat.com / password123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

