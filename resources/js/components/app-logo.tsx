import { Sparkles } from 'lucide-react';

export default function AppLogo() {
    return (
        <div className="group/logo flex items-center gap-2">
            <div className="bg-brand text-brand-foreground flex aspect-square size-8 items-center justify-center rounded-lg shadow-sm transition-transform duration-300 group-hover/logo:scale-110 group-hover/logo:rotate-12">
                <Sparkles className="size-5 transition-all duration-500 group-hover/logo:animate-pulse" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm leading-tight">
                <span className="from-foreground to-foreground/70 group-hover/logo:from-brand group-hover/logo:to-brand/70 truncate bg-gradient-to-r bg-clip-text font-bold tracking-tight text-transparent text-white transition-all duration-300">
                    LaraCollab
                </span>
                <span className="text-muted-foreground group-data-[sidebar=menu-button]:text-sidebar-foreground/70 truncate text-xs font-medium">
                    Project Portal
                </span>
            </div>
        </div>
    );
}
