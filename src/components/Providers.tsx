'use client';

import { useEffect } from "react";
import { initializeData } from "@/services/initializeData";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initializeData();
  }, []);

  return <>{children}</>;
}