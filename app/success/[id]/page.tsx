import { Button } from "@/components/ui/button";
import { CheckCircle, Home } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const complaint = await prisma.registrations.findUnique({
    where: {
      id: id,
    },
  });
  if (!complaint) {
    return notFound();
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-md overflow-hidden shadow-lg">
        <div className="absolute inset-0 z-0" />
        <CardHeader className="relative z-10 space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Complaint Submitted!
          </CardTitle>
          <CardDescription>Thank you for your feedback</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4 text-center">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              Your complaint has been successfully submitted. Our team will
              review it and get back to you as soon as possible.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>
              Reference number:{" "}
              <span className="font-medium">CMP- {complaint.id}</span>
            </p>
          </div>
        </CardContent>
        <CardFooter className="relative w-full z-10 flex justify-between gap-2">
          <Button size="sm" className="w-full" asChild>
            <Link href="/">
              <Home className="mr-2 h-4" />
              Back to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
