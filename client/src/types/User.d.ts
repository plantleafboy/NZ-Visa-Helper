type User = {
    email: string;
     /**
     * User id as defined by the database
     */
     firstName: string;
     /**
     * Users username as entered when created
     */
     lastName: string;
 }

type PatchUser = {
    firstName: string;
    lastName: string;
    email: string;
    oldPassword: string;
    newPassword: string;
};

type LoginUser = {
    email: string,
    password: string;
}

type NewUserDetails = {
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
    password: string;
};