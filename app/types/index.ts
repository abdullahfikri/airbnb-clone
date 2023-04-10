import { User } from '@prisma/client';
export type SafeUser = Omit<
    User,
    'createdA' | 'updatedAt' | 'emailVerified'
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};
