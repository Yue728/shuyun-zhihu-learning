"use client";

import { useEffect } from "react";

export function ShuyunClient() {
  useEffect(() => {
    void import("./shuyun-app.js");
  }, []);

  return <div id="app" />;
}
