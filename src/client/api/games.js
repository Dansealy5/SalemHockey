const API = "http://localhost:3000/api/games";

// GET: Fetch all games
export async function fetchGames() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching games:", err);
    throw err;
  }
}

// GET: Fetch single game by ID
export async function fetchGameById(gameId) {
  try {
    const res = await fetch(`${API}/${gameId}`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching game:", err);
    throw err;
  }
}

// POST: Create a new game (Coach only)
export async function createGame(gameData, token) {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(gameData),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || `Error ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error creating game:", err);
    throw err;
  }
}

// EDIT: Update a game by ID (Coach only)
export async function updateGame(gameId, gameData, token) {
  try {
    const res = await fetch(`${API}/${gameId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(gameData),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || `Error ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error updating game:", err);
    throw err;
  }
}

// DELETE: Delete a game by ID (Coach only)
export async function deleteGame(gameId, token) {
  try {
    const res = await fetch(`${API}/${gameId}`, {
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
    console.error("Error deleting game:", err);
    throw err;
  }
}