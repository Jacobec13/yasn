export interface BaseUser {
	name: string;
	login: string;
}

export interface User extends BaseUser {
	posts: Post[];
}

export interface Post {
	message: string;
}

export interface CreateUserDTO {
	name: string;
	login: string;
}
