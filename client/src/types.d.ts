export type DefaultAPIResponse = {
    success: boolean;
    message: string;
};

export type DefaultAPIError = {
    success: boolean;
    message: string;
    fields: {
        [key: string]: string;
    } | null;
};
