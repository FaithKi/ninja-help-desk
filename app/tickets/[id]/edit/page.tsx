import React from "react";
import EditForm from "./EditForm";
import { notFound } from "next/navigation";

async function getTicket(id: string) {
  try {
    const res = await fetch("http://localhost:4000/tickets/" + id, {
      next: {
        revalidate: 0,
      },
    });
    if (!res.ok) {
      notFound();
    }

    return res.json();
  } catch {
    console.log("error in getTicket");
    return null;
  }
}

export default async function EditTicket({ params }: any) {
  const ticket = await getTicket(params.id);
  return (
    <main>
      <h2 className="test-primary text-center">Edit Ticket</h2>
      <EditForm ticket={ticket} />
    </main>
  );
}
