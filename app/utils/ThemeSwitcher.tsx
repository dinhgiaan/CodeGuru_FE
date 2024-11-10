'use client'
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, systemTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) { return null }

    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <div className="flex items-center justify-center mx-4">
            {
                currentTheme === "light" ? (
                    <BiMoon
                        className="cursor-pointer"
                        fill="black"
                        size={25}
                        onClick={() => setTheme("dark")}
                    />
                ) : (
                    <BiSun
                        className="cursor-pointer"
                        fill="white"
                        size={25}
                        onClick={() => setTheme("light")}
                    />
                )
            }
        </div>
    );
};
