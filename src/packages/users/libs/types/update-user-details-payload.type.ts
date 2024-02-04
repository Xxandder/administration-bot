type UpdateUserDetailsPayload = {
    id: number;
    details: {
        [key: string]: string | null;
        phoneNumber: string | null;
        fullName: string | null;
    }
}

export { UpdateUserDetailsPayload };