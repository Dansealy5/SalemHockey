const API = "http://localhost:3000/api/announcements";

export async function fetchAnnouncements() {
    try {
        const res = await fetch(API);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("Error fetching announcements:", err);
        throw err;
    }
}

export async function createAnnouncement(data, token) {
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
    console.error("Error creating announcement:", err);
    throw err;
  }
}

export async function deleteAnnouncement(id, token) {
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
    console.error("Error deleting announcement:", err);
    throw err;
  }
}