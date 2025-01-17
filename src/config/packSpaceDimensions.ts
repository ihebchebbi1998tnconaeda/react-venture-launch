export type PackSpaceDimensions = {
  [key: string]: {
    main: {
      width: string;
      height: string;
    };
    secondary?: {
      width: string;
      height: string;
    };
    tertiary?: {
      width: string;
      height: string;
    };
  };
};

export const packSpaceDimensions: PackSpaceDimensions = {
  'Pack Prestige': {
    main: {
      width: 'w-[60%]',
      height: 'h-[583px]'
    },
    secondary: {
      width: 'w-[40%]',
      height: 'h-[291px]'
    },
    tertiary: {
      width: 'w-[40%]',
      height: 'h-[291px]'
    }
  },
  'Pack Premium': {
    main: {
      width: 'w-[33%]',
      height: 'h-[583px]'
    },
    secondary: {
      width: 'w-[67%]',
      height: 'h-[291px]'
    },
    tertiary: {
      width: 'w-[67%]',
      height: 'h-[291px]'
    }
  },
  'Pack Trio': {
    main: {
      width: 'w-[50%]',
      height: 'h-[583px]'
    },
    secondary: {
      width: 'w-[50%]',
      height: 'h-[291px]'
    },
    tertiary: {
      width: 'w-[50%]',
      height: 'h-[291px]'
    }
  },
  'Pack Duo': {
    main: {
      width: 'w-[55%]',
      height: 'h-[400px]'
    },
    secondary: {
      width: 'w-[45%]',
      height: 'h-[400px]'
    }
  },
  'Pack Mini Duo': {
    main: {
      width: 'w-[50%]',
      height: 'h-[350px]'
    },
    secondary: {
      width: 'w-[50%]',
      height: 'h-[350px]'
    }
  },
  'Pack Chemise': {
    main: {
      width: 'w-full',
      height: 'h-[583px]'
    }
  },
  'Pack Ceinture': {
    main: {
      width: 'w-full',
      height: 'h-[583px]'
    }
  },
  'Pack Cravatte': {
    main: {
      width: 'w-full',
      height: 'h-[583px]'
    }
  },
  'Pack Malette': {
    main: {
      width: 'w-full',
      height: 'h-[583px]'
    }
  },
  'Pack Portefeuille': {
    main: {
      width: 'w-full',
      height: 'h-[583px]'
    }
  },
  'Pack Porte-carte': {
    main: {
      width: 'w-full',
      height: 'h-[583px]'
    }
  },
  'Pack Porte-clé': {
    main: {
      width: 'w-full',
      height: 'h-[583px]'
    }
  }
};