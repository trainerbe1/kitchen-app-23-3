import { logout } from "../services/auth_service";

export default async function clearData() {
    await logout();
    localStorage.clear();
    location.href = '/';
}