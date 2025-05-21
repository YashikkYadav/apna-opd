"use client";

import { createContext, useState, useContext, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loader from "./Loader";

const LoaderContext = createContext();

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within LoaderProvider");
  }
  return context;
};

function LoaderProviderContent({ children }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {loading && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
}

export function LoaderProvider({ children }) {
  return (
    <Suspense fallback={null}>
      <LoaderProviderContent>{children}</LoaderProviderContent>
    </Suspense>
  );
}
