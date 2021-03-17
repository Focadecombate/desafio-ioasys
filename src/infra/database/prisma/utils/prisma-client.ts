import { PrismaClient } from '@prisma/client'
import { PrismaHelper } from './prisma-helper'

export const prisma = new PrismaClient()

export const prismaHelper = new PrismaHelper(prisma)
