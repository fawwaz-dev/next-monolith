// src/app/api/users/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// GET: get all users
export async function GET(req: Request) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// POST: create user
export async function POST(req: Request) {
  const data = await req.json();

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  const data = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { id: data.id },
  });

  if (!existingUser) {
    return new NextResponse("User not found", { status: 404 });
  }

  let updateData = { ...data };

  if (data.password) {
    const isSamePassword = await bcrypt.compare(
      data.password,
      existingUser.password
    );

    if (!isSamePassword) {
      updateData.password = await bcrypt.hash(data.password, 10);
    } else {
      delete updateData.password;
    }
  } else {
    delete updateData.password;
  }

  const user = await prisma.user.update({
    where: { id: data.id },
    data: updateData,
  });

  return NextResponse.json(user);
}
