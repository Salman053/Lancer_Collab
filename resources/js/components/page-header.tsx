interface PageHeaderProps {
    title: string;
    subtitle?: string; 
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
    return (
        <div className="flex flex-col">
            <h4 className="text-xl font-semibold">{title}</h4>
            {subtitle && (
                <p className="text-lg font-medium text-gray-700 dark:text-gray-400">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default PageHeader;
