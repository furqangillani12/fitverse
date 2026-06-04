// Fitverse design system — extracted from the Figma screens in the Phase-3 doc.
// Single source of truth for colors, gradients, spacing, radii and type.

export const colors = {
  // Brand
  primary: '#5B5FEF',        // indigo — active tab / links
  primaryDark: '#4338CA',
  purple: '#8B3DD6',
  pink: '#E0529C',

  // Text
  text: '#16172B',           // near-black headings
  textMuted: '#6B7280',      // gray subtitles
  textFaint: '#9AA0AE',

  // Surfaces
  bg: '#FFFFFF',
  bgAlt: '#F5F6FA',          // light gray page background
  card: '#FFFFFF',
  border: '#ECECF2',

  // Accents
  orange: '#FF7A1A',
  red: '#EF4444',
  green: '#16A34A',
  blue: '#3B82F6',
  amber: '#F59E0B',

  // Tints (stat tiles / macro cards)
  tintPeach: '#FFEDE3',
  tintBlue: '#E6F0FF',
  tintPurple: '#F0E6FF',
  tintAmber: '#FFF6DA',
  tintGreen: '#E7F8EE',

  white: '#FFFFFF',
  dark: '#0D1117',           // meal camera background
};

// Gradients are passed straight to expo-linear-gradient `colors` prop.
export const gradients = {
  brand: ['#5A6FF0', '#9B43D6', '#E0529C'], // onboarding bg / headers (diagonal)
  button: ['#4F6DF5', '#8E44D8'],           // primary Sign In / Join buttons
  orange: ['#FF8A1B', '#FF3B30'],           // Snap to Track / Challenges header
  green: ['#22C55E', '#15803D'],            // meal save / success
  red: ['#F43F5E', '#E11D48'],              // SOS alert
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };

export const radius = { sm: 8, md: 12, lg: 16, xl: 20, pill: 999 };

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
};

export const font = {
  h1: { fontSize: 28, fontWeight: '700', color: colors.text },
  h2: { fontSize: 22, fontWeight: '700', color: colors.text },
  h3: { fontSize: 18, fontWeight: '600', color: colors.text },
  body: { fontSize: 15, color: colors.text },
  muted: { fontSize: 14, color: colors.textMuted },
  small: { fontSize: 12, color: colors.textMuted },
};
