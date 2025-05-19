const API = "https:/localhost:5173/api/announcements";

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

export async function createAnnouncement(params) {
    
}