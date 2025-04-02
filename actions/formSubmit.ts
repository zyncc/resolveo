"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function handleSubmit(formData: FormData) {
  const data = Object.fromEntries(formData);
  console.log(data);

  const res = await prisma.registrations.create({
    data: {
      name: data.name as string,
      phone: data.phone as string,
      classroomNumber: data.classroomNumber as string,
      complaintType: data.complaintType as string,
      description: data.description as string,
    },
  });
  console.log(res);
  redirect(`/success/${res.id}`);
}
