// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { IStaticMethods } from "preline/dist";

// declare module "vue3-markdown-it";
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
    interface Window {
        HSStaticMethods: IStaticMethods;
        HSOverlay?: {
            close: (selector: string) => void;
            open: (selector: string) => void;
            getInstance: (selector: string, open?: boolean) => {
                element: {
                    close: () => void;
                    open: () => void;
                };
            };
        };
    }
}

export { };
