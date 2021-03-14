import { THEME_VARIABLES } from './configConstants';

export const REVALIDATE_INTERVAL = 12 * 60 * 60; //12h

export const IMAGE_SIZES = `(min-width: ${
  process.env.THEME_VARIABLES?.[THEME_VARIABLES.SCREEN_XXL]
}) 33vw, (min-width: ${
  process.env.THEME_VARIABLES?.[THEME_VARIABLES.SCREEN_MD]
}) 50vw, 100vw`;
