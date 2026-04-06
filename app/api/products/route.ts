import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDB();

    const [rows]: any = await db.execute("SELECT * FROM products");

    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("PRODUCT ERROR:", error);
    return NextResponse.json({ message: "Product Error: " + (error.message || "Unknown error") }, { status: 500 });
  }
}