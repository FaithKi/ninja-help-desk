"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function EditForm({ ticket }: any) {
  const router = useRouter();

  const [newTitle, setNewTitle] = useState(ticket.title);
  const [newBody, setNewBody] = useState(ticket.body);
  const [newPriority, setNewPriority] = useState(ticket.priority);
  const id = ticket._id;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("save clicked");
    const newTicket = {
      title: newTitle,
      body: newBody,
      priority: newPriority,
    };

    const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTicket),
    });

    if (res.status === 200) {
      router.refresh();
      router.push(`/tickets/${id}`);
    }
  };

  return (
    <form className="w-1/2" onSubmit={(e) => handleSubmit(e)}>
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
        />
      </label>
      <select
        value={newPriority}
        onChange={(e) => setNewPriority(e.target.value)}
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <div className="flex justify-start gap-5 pt-1">
        <button className="btn-primary mx-0">Save</button>
        <Link
          href={"/tickets/" + id}
          className="btn-secondary hover:bg-opacity-90 px-3 py-2 rounded-sm text-sm"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
