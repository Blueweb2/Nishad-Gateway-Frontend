"use client";

import { useState, useEffect } from "react";
import Preloader from "./Preloader";

export default function PreloaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <>
      {children}
      {loading && <Preloader onFinish={() => setLoading(false)} />}
    </>
  );
}