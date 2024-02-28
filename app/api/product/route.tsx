import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import z from 'zod';

const categorySchemas = z.object({
    name: z.string(),
    image: z.string(),
});

export async function POST(req: NextRequest, res: NextResponse) {
    const requestBody = await req.json();

    const valide = await categorySchemas.safeParse(requestBody);
    if (!valide.success) {
        throw new Error('Invalid category schemas');
    }

    const category = await prisma.category.create({
        data: {
            name: requestBody.name,
            image: requestBody.image,
        },
    });

    return NextResponse.json(category);
}
export async function GET(req: NextRequest, res: NextResponse) {
    const categories = await prisma.category.findMany({
        include: {
            products: true,
        },
    });

    return NextResponse.json(categories);
}
