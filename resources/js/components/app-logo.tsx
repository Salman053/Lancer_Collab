import { Sparkles } from 'lucide-react';

export default function AppLogo() {
    return (
        <div className="flex items-center gap-2 group/logo">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-brand text-brand-foreground transition-transform duration-300 group-hover/logo:rotate-12 group-hover/logo:scale-110 shadow-sm">
                <Sparkles className="size-5 transition-all duration-500 group-hover/logo:animate-pulse" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-white font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover/logo:from-brand group-hover/logo:to-brand/70 transition-all duration-300">
                    LaraCollab
                </span>
                <span className="truncate text-xs text-muted-foreground group-data-[sidebar=menu-button]:text-sidebar-foreground/70 font-medium">Project Portal</span>
            </div>
        </div>
    );
}
