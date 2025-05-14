"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import CartProvider from "@/providers/CartProvider";
import { I18nProvider } from "@/providers/I18nProvider";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme={"system"}
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <I18nProvider>
            <CartProvider>{children}</CartProvider>
          </I18nProvider>
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
