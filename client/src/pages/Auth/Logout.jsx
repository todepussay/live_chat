import React from "react";
import { logout } from "../../services/AuthApi";

export default function Logout() {
    return logout();
}