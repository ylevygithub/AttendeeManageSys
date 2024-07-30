import { Form, useActionData } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import React, { useState, useEffect } from "react";
import Notification from "~/components/Notification";
import "../tailwind.css";

const prisma = new PrismaClient();

/**
 * Define ActionData Type: This type represents the structure of the data returned by the action function. It's a union type that can be either the data object or null.
 * Use the ActionData Type in useActionData: By specifying <ActionData> when calling useActionData, TypeScript can correctly infer the type of actionData.
 * Ensure Correct Return Types in the action Function: The action function returns json(data) which matches the ActionData type.
 * By providing the correct type to useActionData, TypeScript can now properly handle the actionData variable.
 */
type ActionData = {
  name?: string;
  email?: string;
  attending?: boolean;
  dietaryRestrictions?: string | null;
  checkIn?: string;
  checkOut?: string;
  flightArrival?: string | null;
  flightDeparture?: string | null;
  rsvpDate?: Date;
  error?: string;
} | null;

/** First time
 * In the action function, I added type checks to ensure that the required fields are strings. 
 * If any of these checks fail, an error response is returned. 
 * This will prevent null values from being passed to the Date constructor. 
 */

/** Second time
 * Check for Null Values: Before adding flightArrival and flightDeparture to the data object, we check if they are not null. This ensures they are only added if they have valid string values.
 * Type Assertion for data Object: The data object is initially typed as any to bypass strict type checks. This can be refined further by creating a dynamic type that includes optional fields.
 * Conditional Field Addition: By conditionally adding flightArrival and flightDeparture, we ensure that the data object matches the expected Prisma model input.
 * These changes ensure that the data passed to Prisma is valid and matches the expected types, resolving the type error.
 */
export let action: ActionFunction = async ({ request }) => {
  try {
    let formData = await request.formData();
  
    let name = formData.get("name");
    let email = formData.get("email");
    let attending = formData.get("attending") === "yes";
    let dietaryRestrictions = formData.get("dietaryRestrictions") as string | null;
    let checkIn = formData.get("checkIn");
    let checkOut = formData.get("checkOut");
    let flightArrival = formData.get("flightArrival") as string | null;
    let flightDeparture = formData.get("flightDeparture") as string | null;

    if (typeof name !== "string" || typeof email !== "string" || typeof checkIn !== "string" || typeof checkOut !== "string") {
      return json({ error: "Invalid form data" }, { status: 400 });
    }

    let data: any = {
      name,
      email,
      attending,
      dietaryRestrictions,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      rsvpDate: new Date(),
    };

    // Only add flightArrival and flightDeparture if they are not null
    if (flightArrival) {
      data.flightArrival = flightArrival;
    }
    if (flightDeparture) {
      data.flightDeparture = flightDeparture;
    }

    // Save the data to the database
    await prisma.attendee.create({ data });

    return json(data);
  } catch (error) {
    console.error("Error in action function:", error);
    return json({ error: "An unexpected error occurred" }, { status: 500 });
  }
};

export default function Index() {
  let actionData = useActionData<ActionData>();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (actionData && !actionData.error) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000); // Hide after 3 seconds
    }
  }, [actionData]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="beach-waves"></div>
      <div className="container mx-auto p-4 max-w-md bg-white bg-opacity-50 rounded-lg shadow-md z-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Event RSVP</h1>
        <Form method="post" className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input type="text" name="name" required className="input mt-1 block w-full p-2 border border-gray-300 rounded"/>
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" required className="input mt-1 block w-full p-2 border border-gray-300 rounded"/>
          </div>
          <div>
            <label className="block text-gray-700">Attending</label>
            <select name="attending" className="input mt-1 block w-full p-2 border border-gray-300 rounded">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Dietary Restrictions</label>
            <input type="text" name="dietaryRestrictions" className="input mt-1 block w-full p-2 border border-gray-300 rounded"/>
          </div>
          <div>
            <label className="block text-gray-700">Check-In</label>
            <input type="date" name="checkIn" required className="input mt-1 block w-full p-2 border border-gray-300 rounded"/>
          </div>
          <div>
            <label className="block text-gray-700">Check-Out</label>
            <input type="date" name="checkOut" required className="input mt-1 block w-full p-2 border border-gray-300 rounded"/>
          </div>
          <div>
            <label className="block text-gray-700">Flight Arrival</label>
            <input type="text" name="flightArrival" className="input mt-1 block w-full p-2 border border-gray-300 rounded"/>
          </div>
          <div>
            <label className="block text-gray-700">Flight Departure</label>
            <input type="text" name="flightDeparture" className="input mt-1 block w-full p-2 border border-gray-300 rounded"/>
          </div>
          <button type="submit" className="btn mt-4 bg-blue-500 text-white p-2 rounded w-full">Submit</button>
        </Form>
        {actionData?.error && <p className="text-red-500 mt-4">{actionData.error}</p>}
        <Notification 
          message="RSVP submitted successfully!" 
          show={showNotification} 
          onClose={() => setShowNotification(false)}
        />
      </div>
    </div>
  );
}