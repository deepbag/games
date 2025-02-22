import { LABELS, PATHS } from "./path";

export interface MenuItem {
  label: string;
  path?: string;
}

export const menu: MenuItem[] = [
  {
    label: LABELS.SNAKE,
    path: PATHS.SNAKE,
  },
  {
    label: LABELS.BOX_BLOCK,
    path: PATHS.BOX_BLOCK,
  },
];
