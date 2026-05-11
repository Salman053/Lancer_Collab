import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function ImpactCard({ title, value, subtitle, icon, color, active = false }: any) {
    const colors: any = {
        blue: 'text-blue-600 bg-blue-100/50 dark:bg-blue-900/30 dark:text-blue-400',
        purple: 'text-purple-600 bg-purple-100/50 dark:bg-purple-900/30 dark:text-purple-400',
        green: 'text-green-600 bg-green-100/50 dark:bg-green-900/30 dark:text-green-400',
    };

    return (
        <Card
            className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg ${active ? 'ring-brand dark:ring-offset-background ring-2 ring-offset-2' : ''}`}
        >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-muted-foreground text-xs font-bold tracking-wider uppercase">{title}</CardTitle>
                <div className={`rounded-xl p-2 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 ${colors[color]}`}>
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-black tracking-tight">{value}</div>
                <p className="text-muted-foreground mt-1 flex items-center gap-2 text-xs font-medium">
                    {active && <span className="bg-brand h-1.5 w-1.5 animate-pulse rounded-full" />}
                    {subtitle}
                </p>
            </CardContent>
            {/* Background design */}
            <div
                className={`absolute -right-2 -bottom-2 h-20 w-20 rounded-full opacity-5 transition-opacity group-hover:opacity-10 ${colors[color].split(' ')[1]}`}
            />
        </Card>
    );
}


export default ImpactCard;