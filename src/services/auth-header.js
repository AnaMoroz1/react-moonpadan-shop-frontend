export default function authHeader() {
    let user;
    try {
        user =JSON.parse(localStorage.getItem('user'));

    } catch (e) {
        console.error("Error parsing user from localStorage:", e);
    }

    return user && user.accessToken ? { Authorization: `Bearer ${user.accessToken}` } : {};
}