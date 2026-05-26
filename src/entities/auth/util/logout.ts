import { signOut } from 'next-auth/react';
import { DeleteToken } from '@/shared/util/token';

export async function LogoutCallback() {
    await DeleteToken();
    signOut();
}