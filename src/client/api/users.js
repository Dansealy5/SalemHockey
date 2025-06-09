const API = "http://localhost:3000/api/users";

// GET all users (public)
export async function fetchAllUsers() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
}

// GET one user by ID (public)
export async function fetchUserById(id) {
  try {
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching user:", err);
    throw err;
  }
}

// GET current user (requires auth)
export async function fetchCurrentUser(token) {
  try {
    const res = await fetch(`${API}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching current user:", err);
    throw err;
  }
}

// PUT update a user (requires auth)
export async function updateUser(id, data, token) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error updating user:", err);
    throw err;
  }
}

// DELETE a user (requires auth)
export async function deleteUser(id, token) {
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
    console.error("Error deleting user:", err);
    throw err;
  }
}