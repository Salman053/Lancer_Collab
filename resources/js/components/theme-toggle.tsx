import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
    const { updateAppearance } = useAppearance();

    const toggleTheme = () => {
        const isDark = document.documentElement.classList.contains('dark');
        updateAppearance(isDark ? 'light' : 'dark');
    };

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="group relative h-9 w-9 rounded-md">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all group-hover:text-amber-500 dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all group-hover:text-blue-400 dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
