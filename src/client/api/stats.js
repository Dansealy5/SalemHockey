const API = "http://localhost:3000/api/stats";

// GET: Fetch all stats (public)
export async function fetchStats() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching stats:", err);
    throw err;
  }
}

// GET: Fetch a single stat by ID
export async function fetchStatById(id) {
  try {
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching stat:", err);
    throw err;
  }
}

// POST: Create a new stat (Logged-in users)
export async function createStat(data, token) {
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
    console.error("Error creating stat:", err);
    throw err;
  }
}

// EDIT: Update a stat (Logged-in users)
export async function updateStat(id, data, token) {
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
    console.error("Error updating stat:", err);
    throw err;
  }
}

// DELETE: Delete a stat (Logged-in users)
export async function deleteStat(id, token) {
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
    console.error("Error deleting stat:", err);
    throw err;
  }
}