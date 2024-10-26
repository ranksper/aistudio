export default function SearchIcon({ fill, size, height, width, stroke, ...props }: any) {
    return (
        <svg width={size || width || 24} height={size || height || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="11.5" cy="11.5005" r="9.5" stroke={fill || "currentColor"} strokeWidth={stroke || 2} />
            <path d="M18.5 18.5005L22 22.0005" stroke={fill || "currentColor"} strokeWidth={stroke || 2} strokeLinecap="round" />
        </svg>
    );
}
