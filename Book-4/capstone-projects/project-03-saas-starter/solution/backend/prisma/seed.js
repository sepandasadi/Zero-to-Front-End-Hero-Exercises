import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create users
  const alice = await prisma.user.upsert({
    where: { email: 'alice@saas.com' },
    update: {},
    create: {
      email: 'alice@saas.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Alice Johnson',
      emailVerified: true
    }
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@saas.com' },
    update: {},
    create: {
      email: 'bob@saas.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Bob Smith',
      emailVerified: true
    }
  })

  const charlie = await prisma.user.upsert({
    where: { email: 'charlie@saas.com' },
    update: {},
    create: {
      email: 'charlie@saas.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Charlie Davis',
      emailVerified: true
    }
  })

  console.log('✅ Users created')

  // Create workspaces
  const workspace1 = await prisma.workspace.upsert({
    where: { slug: 'alice-workspace' },
    update: {},
    create: {
      name: 'Alice Workspace',
      slug: 'alice-workspace',
      ownerId: alice.id
    }
  })

  const workspace2 = await prisma.workspace.upsert({
    where: { slug: 'bob-workspace' },
    update: {},
    create: {
      name: 'Bob Workspace',
      slug: 'bob-workspace',
      ownerId: bob.id
    }
  })

  console.log('✅ Workspaces created')

  // Add workspace members
  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: workspace1.id,
        userId: alice.id
      }
    },
    update: {},
    create: {
      workspaceId: workspace1.id,
      userId: alice.id,
      role: 'OWNER'
    }
  })

  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: workspace1.id,
        userId: bob.id
      }
    },
    update: {},
    create: {
      workspaceId: workspace1.id,
      userId: bob.id,
      role: 'ADMIN'
    }
  })

  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: workspace2.id,
        userId: bob.id
      }
    },
    update: {},
    create: {
      workspaceId: workspace2.id,
      userId: bob.id,
      role: 'OWNER'
    }
  })

  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: workspace2.id,
        userId: charlie.id
      }
    },
    update: {},
    create: {
      workspaceId: workspace2.id,
      userId: charlie.id,
      role: 'MEMBER'
    }
  })

  console.log('✅ Workspace members added')

  // Create subscriptions (with fake Stripe IDs for demo)
  await prisma.subscription.upsert({
    where: { workspaceId: workspace1.id },
    update: {},
    create: {
      workspaceId: workspace1.id,
      stripeCustomerId: 'cus_demo_alice',
      status: 'TRIALING',
      plan: 'FREE',
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days
    }
  })

  await prisma.subscription.upsert({
    where: { workspaceId: workspace2.id },
    update: {},
    create: {
      workspaceId: workspace2.id,
      stripeCustomerId: 'cus_demo_bob',
      stripeSubscriptionId: 'sub_demo_bob',
      stripePriceId: process.env.STRIPE_PRICE_PRO || 'price_demo_pro',
      status: 'ACTIVE',
      plan: 'PRO',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    }
  })

  console.log('✅ Subscriptions created')

  console.log('🎉 Seeding complete!')
  console.log('\nTest accounts:')
  console.log('alice@saas.com / password123 (Owner, Free trial)')
  console.log('bob@saas.com / password123 (Owner, Pro plan)')
  console.log('charlie@saas.com / password123 (Member)')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

