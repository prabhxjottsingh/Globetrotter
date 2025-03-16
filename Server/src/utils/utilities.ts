export const extractJsonString = (responseString: string): string => {
    return responseString.replace(/^```json\s*/, "").replace(/\s*```$/, "");
}

export const shuffleArray = (options: any[]): any[] => {
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
}