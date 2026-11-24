import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * COLOR THEME PRESETS FOR NEXORA AI
 * Futuristic dark navy, deep space obsidian, emerald matrix & modern executive light mode
 */
export const THEME_PRESETS = {
  cyberpunkNavy: {
    id: 'cyberpunkNavy',
    name: 'Cyberpunk Navy (Default)',
    description: 'Deep navy, electric cyan, violet and electric blue glow',
    mode: 'dark',
    bgClass: 'theme-navy',
    primaryColor: '#00d2ff',
    secondaryColor: '#6366f1',
    accentColor: '#8b5cf6',
    bgHex: '#060913',
    cardBg: 'rgba(10, 15, 29, 0.78)',
    gradient: 'from-cyan-400 via-blue-500 to-violet-600',
    swatch: ['#00d2ff', '#6366f1', '#8b5cf6'],
  },
  futureLight: {
    id: 'futureLight',
    name: 'Executive Lumina (Light)',
    description: 'Crisp futuristic white, deep slate typography, electric cyan and sapphire accents',
    mode: 'light',
    bgClass: 'theme-light',
    primaryColor: '#0284c7',
    secondaryColor: '#4f46e5',
    accentColor: '#7c3aed',
    bgHex: '#f8fafc',
    cardBg: 'rgba(255, 255, 255, 0.94)',
    gradient: 'from-sky-500 via-blue-600 to-indigo-600',
    swatch: ['#0284c7', '#4f46e5', '#7c3aed'],
  },
  quantumObsidian: {
    id: 'quantumObsidian',
    name: 'Quantum Obsidian (Dark)',
    description: 'Pitch obsidian black, neon purple, amethyst and cyan pulse',
    mode: 'dark',
    bgClass: 'theme-amethyst',
    primaryColor: '#c084fc',
    secondaryColor: '#8b5cf6',
    accentColor: '#00d2ff',
    bgHex: '#080511',
    cardBg: 'rgba(17, 10, 31, 0.78)',
    gradient: 'from-purple-400 via-violet-600 to-cyan-400',
    swatch: ['#c084fc', '#8b5cf6', '#00d2ff'],
  },
  emeraldMatrix: {
    id: 'emeraldMatrix',
    name: 'Emerald Matrix (Dark)',
    description: 'Deep neural space, neon emerald and cyan telemetry',
    mode: 'dark',
    bgClass: 'theme-emerald',
    primaryColor: '#10b981',
    secondaryColor: '#06b6d4',
    accentColor: '#00d2ff',
    bgHex: '#040d0a',
    cardBg: 'rgba(6, 21, 16, 0.78)',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-400',
    swatch: ['#10b981', '#06b6d4', '#00d2ff'],
  }
};

const defaultPreset = THEME_PRESETS.cyberpunkNavy;

const defaultThemeContextValue = {
  activePreset: 'cyberpunkNavy',
  setPreset: () => {},
  setThemePreset: () => {},
  presetConfig: defaultPreset,
  themePreset: defaultPreset,
  themeMode: 'dark',
  toggleThemeMode: () => {},
  compactMode: false,
  setCompactMode: () => {},
  toggleCompactMode: () => {},
};

const ThemeContext = createContext(defaultThemeContextValue);

export const ThemeProvider = ({ children }) => {
  const [activePreset, setActivePreset] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nexora_theme_preset') || 'cyberpunkNavy';
    }
    return 'cyberpunkNavy';
  });

  const [compactMode, setCompactMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nexora_compact_mode') === 'true';
    }
    return false;
  });

  const presetConfig = THEME_PRESETS[activePreset] || THEME_PRESETS.cyberpunkNavy;
  const themeMode = presetConfig.mode;

  useEffect(() => {
    const root = document.documentElement;

    // Clear old classes
    Object.values(THEME_PRESETS).forEach((p) => {
      root.classList.remove(p.bgClass);
    });

    // Apply active class
    root.classList.add(presetConfig.bgClass);

    // Sync dark class for Tailwind
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Set CSS custom properties
    root.style.setProperty('--primary-accent', presetConfig.primaryColor);
    root.style.setProperty('--secondary-accent', presetConfig.secondaryColor);
    root.style.setProperty('--tertiary-accent', presetConfig.accentColor);
    root.style.setProperty('--theme-bg', presetConfig.bgHex);

    localStorage.setItem('nexora_theme_preset', activePreset);
  }, [activePreset, presetConfig, themeMode]);

  const toggleThemeMode = () => {
    if (themeMode === 'dark') {
      setActivePreset('futureLight');
    } else {
      setActivePreset('cyberpunkNavy');
    }
  };

  const handleSetPreset = (presetKey) => {
    if (THEME_PRESETS[presetKey]) {
      setActivePreset(presetKey);
    }
  };

  const handleToggleCompact = () => {
    setCompactMode((prev) => {
      const next = !prev;
      localStorage.setItem('nexora_compact_mode', String(next));
      return next;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        activePreset,
        setPreset: handleSetPreset,
        setThemePreset: handleSetPreset,
        presetConfig,
        themePreset: presetConfig,
        themeMode,
        toggleThemeMode,
        compactMode,
        toggleCompactMode: handleToggleCompact,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context || defaultThemeContextValue;
};
