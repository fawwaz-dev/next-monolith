import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// DELETE: delete user
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.error("Delete user error:", error);
    return new NextResponse("User not found", { status: 404 });
  }
}
