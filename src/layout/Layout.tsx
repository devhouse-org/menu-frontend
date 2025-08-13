import React from 'react'
import { getThemeColors } from "@/utils";

export default function Layout({children}: {children: React.ReactNode}) {
    const theme = getThemeColors();
  return (
    <div className="overflow-hidden relative p-4 ring-1 shadow-lg backdrop-blur-md ring-white/10" style={{
        background: `linear-gradient(135deg, ${theme.primary}1A 0%, rgba(255,255,255,0.9) 100%)`,
      }}>
        {children}
    </div>
  )
}
