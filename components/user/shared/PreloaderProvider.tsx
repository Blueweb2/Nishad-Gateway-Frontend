"use client";

import { useState } from "react";
import Preloader from "./Preloader";

export default function PreloaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {!loading && children}
      {loading && <Preloader onFinish={() => setLoading(false)} />}
    </>
  );
};