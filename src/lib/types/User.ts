import type { User } from 'firebase/auth';

export interface UserStore {
	user?: User;
	permission?: string;
	avatar?: string;
	token?: string;
}
