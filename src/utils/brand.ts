/**
 * The brand is written "ZAN Tech". Older text saved in the admin panel still says
 * "Zantech"; fix it on display. Only the capitalised word is changed, so emails,
 * links and handles (zantechbd.com, ZantechBD) stay as they are.
 */
export const brandText = <T extends string | null | undefined>(text: T): T =>
    (typeof text === 'string' ? text.replace(/Zantech(?!BD)/g, 'ZAN Tech') : text) as T;
