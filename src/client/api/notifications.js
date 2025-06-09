const API = "http://localhost:3000/api/notifications";

// GET: Fetch user's notifications (requires auth)
export async function fetchNotifications(token) {
  try {
    const res = await fetch(API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching notifications:", err);
    throw err;
  }
}

// EDIT: Mark a notification as read
export async function markNotificationRead(notificationId, token) {
  try {
    const res = await fetch(`${API}/${notificationId}/read`, {
      method: "PATCH",
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
    console.error("Error marking notification as read:", err);
    throw err;
  }
}

// DELETE: Remove a notification
export async function deleteNotification(notificationId, token) {
  try {
    const res = await fetch(`${API}/${notificationId}`, {
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
    console.error("Error deleting notification:", err);
    throw err;
  }
}