export type DefaultError = {
    success: boolean;
    message: string;
    fields: {
        [key: string]: string;
    } | null;
};
