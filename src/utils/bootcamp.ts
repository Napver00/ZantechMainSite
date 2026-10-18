// Shared bits for the bootcamp list and details pages.
// A bootcamp is a course with kind = 'bootcamp' plus dates, a venue and a seat limit.

export interface BootcampSummary {
    id: number; title: string; slug: string; thumbnail: string; category: string;
    short_description: string | null;
    price: number | null; discount_price: number | null;
    payment_type: 'one_time' | 'monthly'; monthly_fee: number | null; duration_months: number | null;
    admission_fee: number | null; admission_fee_label?: string | null;
    age_group?: string | null; level?: string | null;
    start_date: string | null; end_date: string | null; registration_deadline: string | null;
    venue: string | null; seats: number | null; seats_taken: number;
}

export type BootcampStatus = 'open' | 'closing' | 'soldout' | 'closed' | 'ended';

const day = (d: string) => new Date(`${d}T00:00:00`);
const today = () => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; };

export const fmtTk = (n: number | string | null | undefined) =>
    Number(n ?? 0).toLocaleString('en-BD', { maximumFractionDigits: 2 });

export const fmtDay = (d: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) =>
    day(d).toLocaleDateString('en-GB', opts);

/** "12 – 16 Dec 2026", "28 Dec 2026 – 2 Jan 2027" or "12 Dec 2026" */
export const fmtRange = (start: string | null, end: string | null) => {
    if (!start) return 'Dates coming soon';
    if (!end || end === start) return fmtDay(start);
    const s = day(start), e = day(end);
    if (s.getFullYear() === e.getFullYear() && s.getMonth() === e.getMonth()) {
        return `${s.getDate()} – ${fmtDay(end)}`;
    }
    if (s.getFullYear() === e.getFullYear()) {
        return `${fmtDay(start, { day: 'numeric', month: 'short' })} – ${fmtDay(end)}`;
    }
    return `${fmtDay(start)} – ${fmtDay(end)}`;
};

export const dayCount = (start: string | null, end: string | null) =>
    start ? Math.round((day(end || start).getTime() - day(start).getTime()) / 86400000) + 1 : null;

export const daysUntil = (d: string | null) =>
    d ? Math.ceil((day(d).getTime() - today().getTime()) / 86400000) : null;

export const seatsLeft = (b: Pick<BootcampSummary, 'seats' | 'seats_taken'>) =>
    b.seats ? Math.max(b.seats - (b.seats_taken || 0), 0) : null;

export const bootcampStatus = (
    b: Pick<BootcampSummary, 'start_date' | 'end_date' | 'registration_deadline' | 'seats' | 'seats_taken'>,
): BootcampStatus => {
    const t = today();
    const last = b.end_date || b.start_date;
    if (last && day(last) < t) return 'ended';
    if (b.registration_deadline && day(b.registration_deadline) < t) return 'closed';
    const left = seatsLeft(b);
    if (left === 0) return 'soldout';
    if ((left !== null && left <= 5) || (b.registration_deadline && (daysUntil(b.registration_deadline) ?? 99) <= 3)) return 'closing';
    return 'open';
};

export const STATUS_LABEL: Record<BootcampStatus, string> = {
    open: 'Registration open',
    closing: 'Filling fast',
    soldout: 'Sold out',
    closed: 'Registration closed',
    ended: 'Completed',
};

export const realPrice = (b: Pick<BootcampSummary, 'discount_price' | 'price'>) => b.discount_price ?? b.price;

export const hasDiscount = (b: Pick<BootcampSummary, 'discount_price' | 'price'>) =>
    b.discount_price != null && b.price != null && Number(b.discount_price) < Number(b.price);
