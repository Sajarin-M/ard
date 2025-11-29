import { os } from '@orpc/server';

const base = os.$context<{ headers: Headers }>();

export const publicProcedure = base;
