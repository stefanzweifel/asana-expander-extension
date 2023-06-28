export function log(message: string, context: any = null) {
    console.log(`::asana-expander:: ${message}`, context);
}
