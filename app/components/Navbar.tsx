import Image from "next/image";
import Link from "next/link";
import Logo from "./dojo-logo.png";

import React from "react";

export default function Navbar() {
  return (
    <nav>
      <Image
        src={Logo}
        alt="Dojo Helpdesk Logo"
        width={70}
        quality={100}
        placeholder="blur"
      />
      <h1>Dojo Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
      <Link href="/tickets/create">Create Ticket</Link>
    </nav>
  );
}
