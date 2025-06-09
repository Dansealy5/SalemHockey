const API = "http://localhost:3000/api/media";

// GET: Fetch all media
export async function fetchMedia() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching media:", err);
    throw err;
  }
}

// POST: Create new media entry (Coach only)
export async function createMedia(mediaData, token) {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mediaData),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || `Error ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error creating media:", err);
    throw err;
  }
}

// DELETE: Delete media by ID (Coach only)
export async function deleteMedia(mediaId, token) {
  try {
    const res = await fetch(`${API}/${mediaId}`, {
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
    console.error("Error deleting media:", err);
    throw err;
  }
}
