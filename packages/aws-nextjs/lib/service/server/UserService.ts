export interface IUserService {

    // If we ever allow more updates to user data, we should make this a service as well
    getUser(email: string): Promise<{ id: number; username: string } | null>;

}
