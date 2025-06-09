const API = "http://localhost:3000/api/players";

// GET: Fetch all players (public)
export async function fetchPlayers() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching players:", err);
    throw err;
  }
}

// GET: Fetch a single player by ID
export async function fetchPlayerById(id) {
  try {
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching player:", err);
    throw err;
  }
}

// POST: Create a new player (Coach only)
export async function createPlayer(data, token) {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error creating player:", err);
    throw err;
  }
}

// EDIT: Update a player (Coach only)
export async function updatePlayer(id, data, token) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error updating player:", err);
    throw err;
  }
}

// DELETE: Delete a player (Admin only)
export async function deletePlayer(id, token) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(`Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error deleting player:", err);
    throw err;
  }
}