import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Phone, School } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.session) {
    redirect("/signin");
  }
  const registrations = await prisma.registrations.findMany({
    where: {
      approved: false,
      status: false,
    },
  });

  async function handleApprove(formData: FormData) {
    "use server";
    const id = formData.get("id");
    await prisma.registrations.update({
      where: {
        id: id as string,
      },
      data: {
        approved: true,
      },
    });
    revalidatePath("/dashboard");
  }
  return (
    <div className="mx-auto container mt-[100px]">
      <h1 className="text-2xl font-medium">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        {registrations.map((registration) => (
          <Card
            className="w-full max-w-md overflow-hidden border-0 shadow-lg py-0"
            key={registration.id}
          >
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">
                    {registration.name}
                  </CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    {registration.phone}
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge
                    variant={registration.approved ? "default" : "outline"}
                    className="px-3 py-1"
                  >
                    {registration.approved ? "Approved" : "Not Approved"}
                  </Badge>
                  <Badge
                    variant={registration.status ? "default" : "destructive"}
                    className="px-3 py-1"
                  >
                    {registration.status ? "Resolved" : "Not Resolved"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Classroom {registration.classroomNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {registration.complaintType}
                  </span>
                </div>
                <Separator className="my-2" />
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                    Description
                  </h3>
                  <div className="rounded-md bg-slate-50 p-3 text-sm">
                    <p className="line-clamp-3 text-slate-700">
                      {registration.description}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-start bg-slate-50 px-6 py-3">
              <div className="text-xs text-muted-foreground flex justify-between items-center w-full">
                Complaint ID: #{registration.id}
                <form action={handleApprove}>
                  <input type="hidden" name="id" value={registration.id} />
                  <Button type="submit">Approve</Button>
                </form>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
