export interface User {
	name: string;
	login: string;
	posts: Post[];
}

export interface Post {
	message: string;
}

export interface CreateUserDTO {
	name: string;
	login: string;
}
