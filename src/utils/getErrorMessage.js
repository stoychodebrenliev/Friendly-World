export default function getErrorMessage(error) {
    return error.issues?.[0]?.message || error.message;
}