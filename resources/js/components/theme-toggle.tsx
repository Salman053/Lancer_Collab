import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
    const { appearance, updateAppearance } = useAppearance();

    const toggleTheme = () => {
        const isDark = document.documentElement.classList.contains('dark');
        updateAppearance(isDark ? 'light' : 'dark');
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="group relative h-9 w-9 rounded-md"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all group-hover:text-amber-500 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all group-hover:text-blue-400 dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
