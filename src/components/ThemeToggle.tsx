import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const modes: { value: 'light' | 'system' | 'dark'; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun size={14} />, label: 'Light' },
    { value: 'system', icon: <Monitor size={14} />, label: 'System' },
    { value: 'dark', icon: <Moon size={14} />, label: 'Dark' },
  ];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 p-1',
        className
      )}
      role="radiogroup"
      aria-label="Theme selection"
    >
      {modes.map((mode) => (
        <button
          key={mode.value}
          type="button"
          role="radio"
          aria-checked={theme === mode.value}
          aria-label={`${mode.label} theme`}
          onClick={() => setTheme(mode.value)}
          className={cn(
            'relative flex items-center justify-center rounded-lg p-2 transition-all duration-200',
            theme === mode.value
              ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          )}
        >
          {mode.icon}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
