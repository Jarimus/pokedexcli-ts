export function cleanInput(s: string): string[] {
    const words = s.toLowerCase().trim().split(" ");
    const result = []
    for (const i in words) {
        if (words[i].length > 0) {
            result.push(words[i].trim());
        }
    }
    return result;
}