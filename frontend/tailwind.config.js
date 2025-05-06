/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        brand: {
          black: '#0A0A0A', // Deep black for backgrounds or primary text
          gold: '#FFD700',  // Classic gold for accents, highlights, and calls to action
          'gold-light': '#FFEC8B', // Lighter gold for hover states or secondary elements
          'gold-dark': '#B8860B',  // Darker gold for borders or subtle details
          neutral: '#1A1A1A', // Dark neutral for secondary backgrounds or cards
          'neutral-light': '#2A2A2A', // Lighter neutral for borders or dividers
          'text-primary': '#FFFFFF', // White for primary text on dark backgrounds
          'text-secondary': '#E0E0E0', // Light gray for secondary text
          'accent-primary': '#00FF9D', // Existing accent, can be used alongside gold
          'accent-secondary': '#00E6FF', // Existing accent, can be used alongside gold
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}

