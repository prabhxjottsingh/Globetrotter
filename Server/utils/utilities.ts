export const extractJsonString = (responseString: string): string => {
    return responseString.replace(/^```json\s*/, "").replace(/\s*```$/, "");
}