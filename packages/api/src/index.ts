export interface BaseUser {
	name: string;
	login: string;
}

export interface User extends BaseUser {
	posts: Post[];
}

export interface Post {
	id: string;
	message: string;
}

export interface CreateUserDTO {
	name: string;
	login: string;
}

export interface CreatePostDTO {
	message: string;
}
