export interface User {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: "artist" | "buyer";
    profilePicture?: string;
    bio?: string;
    socialLinks?: {
        instagram?: string;
        twitter?: string;
    };
    isVerified: boolean;
    verificationToken?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}