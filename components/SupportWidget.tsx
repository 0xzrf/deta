"use client"

import { useEffect } from "react";
import Intercom from "@intercom/messenger-js-sdk";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: number; // Unix timestamp in seconds
}

interface SupportWidgetProps {
  user: User;
}

export function SupportWidget({ user }: SupportWidgetProps) {
  useEffect(() => {
    Intercom({
      app_id: "r7zbygiz",
      user_id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt,
    });
  }, [user]);

  return null; // This component doesn't render anything visible
} 