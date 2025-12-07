import type { Metadata } from "next";
import "./globals.css";

import { AppProviders } from "./providers";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "@iota/dapp-kit/dist/index.css";

export const metadata: Metadata = {
  title: "Daily Trivia dApp",
  description: "On-chain daily trivia game on IOTA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Theme appearance="dark">
          <AppProviders>{children}</AppProviders>
        </Theme>
      </body>
    </html>
  );
}
