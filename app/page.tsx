import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Phone, School } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";

export default async function Home() {
  const complaints = await prisma.registrations.findMany({
    where: {
      approved: true,
      status: false,
    },
  });
  return (
    <>
      <section className="hero">
        <div className="h-screen container mx-auto w-screen flex items-start justify-start z-10 text-black gap-10">
          <div className="flex flex-col mt-[200px]">
            <h1 className="font-bold text-5xl">Your Voice, Our Action</h1>
            <Link href="/register" className="w-fit">
              <Button
                size="lg"
                className="w-full mt-5 hover:bg-purple-900 rounded-3xl bg-purple-600"
              >
                Post a Complaint
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="container mx-auto mt-[200px] min-h-screen">
        <h1 className="text-2xl font-medium">Recent Complaints</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
          {complaints.map((complaint) => (
            <Card
              className="w-full max-w-md overflow-hidden border-0 shadow-lg py-0"
              key={complaint.id}
            >
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">
                      {complaint.name}
                    </CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      {complaint.phone}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge
                      variant={complaint.approved ? "default" : "outline"}
                      className="px-3 py-1"
                    >
                      {complaint.approved ? "Approved" : "Not Approved"}
                    </Badge>
                    <Badge
                      variant={complaint.status ? "default" : "destructive"}
                      className="px-3 py-1"
                    >
                      {complaint.status ? "Resolved" : "Not Resolved"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <School className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      Classroom {complaint.classroomNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {complaint.complaintType}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                      Description
                    </h3>
                    <div className="rounded-md bg-slate-50 p-3 text-sm">
                      <p className="line-clamp-3 text-slate-700">
                        {complaint.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-start bg-slate-50 px-6 py-3">
                <div className="text-xs text-muted-foreground flex justify-between items-center w-full">
                  Complaint ID: #{complaint.id}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
