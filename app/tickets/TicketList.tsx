import Link from "next/link";

async function getTickets() {
  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 0,
      //this means that next will cache the res for xxx seconds
      //set revalidate to 0 to not cache res at all (will need to fetch everytime this function is called)(make things slower)
    },
  });
  return res.json();
}

export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <>
      {tickets.map((ticket: any) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {tickets.lenght === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  );
}
