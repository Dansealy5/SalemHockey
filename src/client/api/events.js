const API = "http://localhost:3000/api/events";

// GET: Fetch all events
export async function fetchEvents() {
    try {
        const res = await fetch(API);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("Error fetching events:", err)
        throw err;
    }
}

// POST: Create a new event (requires token, Coach only)
export async function createEvent(eventData, token) {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || `Error ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error creating event:", err);
    throw err;
  }
}

// DELETE: Delete an event by ID (requires token, Coach only)
export async function deleteEvent(eventId, token) {
  try {
    const res = await fetch(`${API}/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || `Error ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error deleting event:", err);
    throw err;
  }
}
