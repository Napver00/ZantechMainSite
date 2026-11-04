// Who built a project. Set in the admin (Website › Projects).
export type ProjectCategory = 'rnd' | 'student';

export const PROJECT_CATEGORIES: { value: ProjectCategory; label: string; short: string; blurb: string }[] = [
    {
        value: 'rnd',
        label: 'ZAN Tech R&D',
        short: 'R&D',
        blurb: 'Custom electronics, IoT and robotics designed and built by the ZAN Tech team.',
    },
    {
        value: 'student',
        label: 'Student projects',
        short: 'Student',
        blurb: 'Built by our students during ZAN Tech courses and bootcamps.',
    },
];

/** Projects saved before categories existed count as R&D. */
export const categoryOf = (p: { category?: string | null }): ProjectCategory =>
    p.category === 'student' ? 'student' : 'rnd';

export const isProjectCategory = (v: string | null): v is ProjectCategory => v === 'rnd' || v === 'student';

/** Small label for project cards. */
export const categoryBadgeClass = (c: ProjectCategory) =>
    c === 'student'
        ? 'bg-amber-400/90 text-zan-dark border-amber-300'
        : 'bg-zan-cyan/90 text-zan-dark border-zan-cyan';
