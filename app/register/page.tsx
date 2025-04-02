import React from "react";
import { handleSubmit } from "@/actions/formSubmit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Register() {
  return (
    <div className="container mx-auto mt-[100px]">
      <h1 className="font-semibold text-xl mb-5">Register a Complaint</h1>
      <form action={handleSubmit} className="flex flex-col gap-y-5">
        <Input placeholder="Student Name" required type="text" name="name" />
        <Input placeholder="Phone" required type="tel" name="phone" />
        <Input
          placeholder="Classroom no"
          required
          type="text"
          name="classroomNumber"
        />
        <Label htmlFor="complaintType">Complaint Type</Label>
        <select
          className="
        flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          name="complaintType"
        >
          <option value="Harrasment">Harrasment</option>
          <option value="Classroom Malfunctions">Classroom Malfunctions</option>
        </select>
        <Textarea
          placeholder="Description of issue"
          required
          name="description"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
