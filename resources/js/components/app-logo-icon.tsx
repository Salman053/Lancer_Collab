import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 3l1.912 5.886L20 9.604l-4.472 4.359L16.545 21 12 17.277 7.455 21l1.017-7.037L4 9.604l6.088-.718L12 3z" fill="currentColor" />
        </svg>
    );
}
