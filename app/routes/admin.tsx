import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import "../tailwind.css";

const prisma = new PrismaClient();

/** First Time
 * Import the Attendee type from Prisma: This provides the type definition for the Attendee model based on your Prisma schema.
 * Specify the Type for loader Return Value: Ensure that the loader function explicitly returns an array of Attendee.
 * Use Attendee Type in useLoaderData: Specify that useLoaderData returns an array of Attendee.
 * Type the Parameter in map Function: Ensure that the parameter in the map function is explicitly typed as Attendee.
 * By explicitly typing the attendee parameter, you ensure that TypeScript understands the structure of the attendee object and can provide proper type checking and autocompletion.
 */

/** Second time
 * Define the Attendee Type: Create a TypeScript type based on the schema defined in your Prisma schema. This type includes all the fields in the Attendee model.
 * Use the Attendee Type in the loader Function: Ensure that the loader function returns an array of Attendee.
 * Specify the Type for useLoaderData: Specify that useLoaderData returns an array of Attendee.
 * By manually defining the Attendee type, you can ensure that TypeScript properly checks and infers the types.
 */
type Attendee = {
  id: number;
  name: string;
  email: string;
  attending: boolean;
  dietaryRestrictions: string | null;
  checkIn: Date;
  checkOut: Date;
  flightArrival: string | null;
  flightDeparture: string | null;
  rsvpDate: Date;
};

export let loader: LoaderFunction = async () => {
  let attendees: Attendee[] = await prisma.attendee.findMany();
  return attendees;
};

export default function Admin() {
  let attendees = useLoaderData<Attendee[]>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Page</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Attending</th>
            <th className="py-2 px-4 border-b">Dietary Restrictions</th>
            <th className="py-2 px-4 border-b">Check-In</th>
            <th className="py-2 px-4 border-b">Check-Out</th>
            <th className="py-2 px-4 border-b">Flight Arrival</th>
            <th className="py-2 px-4 border-b">Flight Departure</th>
            <th className="py-2 px-4 border-b">RSVP Date</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => (
            <tr key={attendee.id}>
              <td className="border px-4 py-2">{attendee.name}</td>
              <td className="border px-4 py-2">{attendee.email}</td>
              <td className="border px-4 py-2">{attendee.attending ? "Yes" : "No"}</td>
              <td className="border px-4 py-2">{attendee.dietaryRestrictions}</td>
              <td className="border px-4 py-2">{new Date(attendee.checkIn).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{new Date(attendee.checkOut).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{attendee.flightArrival}</td>
              <td className="border px-4 py-2">{attendee.flightDeparture}</td>
              <td className="border px-4 py-2">{new Date(attendee.rsvpDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}