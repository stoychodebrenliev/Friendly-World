export default function getErrorMessage(error) {
    if (error?.issues?.length > 0) {
        return error.issues[0].message;
    }

    return error.message || 'Something went wrong';
}