import React from 'react';
import { Route } from "react-router-dom";

const MondeFioriHistoire = React.lazy(() => import('@/pages/MondeFioriHistoire'));
const MondeFioriCollection = React.lazy(() => import('@/pages/MondeFioriCollection'));
const MondeFioriDNA = React.lazy(() => import('@/pages/MondeFioriDNA'));

export const mondeFioriRoutes = [
  {
    path: "/monde-fiori/histoire",
    element: <MondeFioriHistoire />
  },
  {
    path: "/monde-fiori/collection",
    element: <MondeFioriCollection />
  },
  {
    path: "/monde-fiori/dna",
    element: <MondeFioriDNA />
  }
];