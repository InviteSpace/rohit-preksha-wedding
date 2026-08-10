interface InvitationFloralsProps {
  className?: string;
  flip?: boolean;
}

export default function InvitationFlorals({
  className = "",
  flip = false,
}: InvitationFloralsProps) {
  return (
    <svg
      viewBox="0 0 220 150"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
    >
      <defs>
        <linearGradient id="whitePetal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.72" stopColor="#fffdf8" />
          <stop offset="1" stopColor="#eceae5" />
        </linearGradient>
      </defs>

      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 146C36 119 55 75 100 42C132 19 168 10 216 12" stroke="#d6ad63" strokeWidth="3" />
        <path d="M27 126C45 105 50 82 53 55M73 77C97 67 108 48 116 24M119 45C145 41 158 25 169 8" stroke="#d6ad63" strokeWidth="2.4" />

        <g fill="#d6ad63" stroke="#d6ad63">
          <path d="M29 124C8 118 5 100 7 90C27 92 40 104 29 124Z" />
          <path d="M47 99C29 87 31 69 37 59C56 68 64 84 47 99Z" />
          <path d="M54 74C59 50 79 44 91 46C86 67 73 79 54 74Z" />
          <path d="M79 70C86 47 107 42 119 45C111 64 97 75 79 70Z" />
          <path d="M107 45C111 22 131 15 142 17C138 38 125 49 107 45Z" />
          <path d="M139 32C149 11 169 11 180 16C170 35 156 42 139 32Z" />
          <path d="M168 21C181 3 201 6 212 12C201 29 185 33 168 21Z" />
          <path d="M91 116C105 98 124 102 134 109C121 124 106 128 91 116Z" />
        </g>

        {/* Large layered white blossoms like the reference artwork */}
        <g stroke="#e5e2dc" strokeWidth="1.2">
          <g transform="translate(101 91)">
            <ellipse cx="0" cy="-20" rx="14" ry="25" fill="url(#whitePetal)" />
            <ellipse cx="19" cy="-7" rx="14" ry="25" fill="url(#whitePetal)" transform="rotate(66 19 -7)" />
            <ellipse cx="12" cy="17" rx="14" ry="25" fill="url(#whitePetal)" transform="rotate(142 12 17)" />
            <ellipse cx="-13" cy="17" rx="14" ry="25" fill="url(#whitePetal)" transform="rotate(-142 -13 17)" />
            <ellipse cx="-20" cy="-7" rx="14" ry="25" fill="url(#whitePetal)" transform="rotate(-66 -20 -7)" />
            <circle r="9" fill="#d6ad63" stroke="#d6ad63" />
            <g stroke="#c99b4c" strokeWidth="1">
              <path d="M-18 0H18M0-18V18M-13-13L13 13M13-13L-13 13" />
            </g>
          </g>

          <g transform="translate(160 43) scale(.72)">
            <ellipse cx="0" cy="-20" rx="14" ry="25" fill="url(#whitePetal)" />
            <ellipse cx="19" cy="-7" rx="14" ry="25" fill="url(#whitePetal)" transform="rotate(66 19 -7)" />
            <ellipse cx="12" cy="17" rx="14" ry="25" fill="url(#whitePetal)" transform="rotate(142 12 17)" />
            <ellipse cx="-13" cy="17" rx="14" ry="25" fill="url(#whitePetal)" transform="rotate(-142 -13 17)" />
            <ellipse cx="-20" cy="-7" rx="14" ry="25" fill="url(#whitePetal)" transform="rotate(-66 -20 -7)" />
            <circle r="9" fill="#d6ad63" stroke="#d6ad63" />
          </g>

          <g transform="translate(31 127) scale(.58)">
            <ellipse cx="0" cy="-20" rx="14" ry="25" fill="url(#whitePetal)" />
            <ellipse cx="19" cy="-7" rx="14" ry="25" fill="url(#whitePetal)" transform="rotate(66 19 -7)" />
            <ellipse cx="12" cy="17" rx="14" ry="25" fill="url(#whitePetal)" transform="rotate(142 12 17)" />
            <ellipse cx="-13" cy="17" rx="14" ry="25" fill="url(#whitePetal)" transform="rotate(-142 -13 17)" />
            <ellipse cx="-20" cy="-7" rx="14" ry="25" fill="url(#whitePetal)" transform="rotate(-66 -20 -7)" />
            <circle r="9" fill="#d6ad63" stroke="#d6ad63" />
          </g>
        </g>

        <g fill="#fffdf8" stroke="#d6ad63" strokeWidth="1.5">
          <circle cx="64" cy="35" r="6" />
          <circle cx="198" cy="37" r="5" />
          <circle cx="62" cy="137" r="4" />
        </g>
      </g>
    </svg>
  );
}
