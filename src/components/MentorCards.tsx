import { useLayoutEffect, useRef, useState } from 'react';
import { Award, GraduationCap } from 'lucide-react';
import { API_BASE_URL } from '../config';

// Mentor cards for course and bootcamp pages: photo, name, role, experience
// and their bio. One mentor gets a wide card; several share a grid.

export interface MentorInfo {
    id: number;
    name: string;
    image?: string | null;
    description?: string | null;
    experience?: string | null;
    is_student_mentor?: boolean;
}

const photoUrl = (m: MentorInfo) =>
    !m.image ? '' : m.image.startsWith('http') ? m.image : `${API_BASE_URL}/${m.image}`;

const avatarUrl = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=006970&color=fff&size=400`;

/** "4" → "4 years of experience"; anything the admin wrote in words stays as written. */
const experienceText = (raw?: string | null) => {
    const value = (raw || '').trim();
    if (!value) return '';
    const years = value.match(/^(\d+(?:\.\d+)?)\s*(\+)?\s*(?:years?|yrs?)?$/i);
    if (!years) return value;
    const n = Number(years[1]);
    return `${years[1]}${years[2] || ''} ${n === 1 && !years[2] ? 'year' : 'years'} of experience`;
};

const MentorCard = ({ mentor, wide }: { mentor: MentorInfo; wide: boolean }) => {
    const [open, setOpen] = useState(false);
    const [cut, setCut] = useState(false);
    const bioRef = useRef<HTMLParagraphElement>(null);
    const bio = (mentor.description || '').trim();

    // "Read more" only when the 4-line preview really hides text, at this screen width.
    useLayoutEffect(() => {
        const el = bioRef.current;
        if (!el || open) return;
        const measure = () => setCut(el.scrollHeight > el.clientHeight + 1);
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(el);
        return () => observer.disconnect();
    }, [bio, open]);
    const experience = experienceText(mentor.experience);
    const RoleIcon = mentor.is_student_mentor ? GraduationCap : Award;
    const bioId = `mentor-bio-${mentor.id}`;

    return (
        <article
            className={`h-full bg-zan-dark border border-white/10 rounded-xl p-5 sm:p-6 flex gap-5 ${wide ? 'flex-col sm:flex-row sm:items-start' : 'flex-col'}`}
        >
            <div className={`flex items-center gap-4 ${wide ? 'sm:flex-col sm:items-start sm:w-44 shrink-0' : ''}`}>
                <img
                    src={photoUrl(mentor) || avatarUrl(mentor.name)}
                    alt={mentor.name}
                    loading="lazy"
                    className={`${wide ? 'w-20 h-20 sm:w-40 sm:h-40' : 'w-20 h-20'} rounded-xl object-cover bg-surface-dark ring-1 ring-zan-cyan/30 shrink-0`}
                    onError={(e) => { (e.target as HTMLImageElement).src = avatarUrl(mentor.name); }}
                />
                <div className={`min-w-0 ${wide ? 'sm:hidden' : ''}`}>
                    <h3 className="text-white font-bold text-lg leading-snug">{mentor.name}</h3>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-zan-cyan">
                        <RoleIcon className="w-4 h-4" aria-hidden="true" />
                        {mentor.is_student_mentor ? 'Student mentor' : 'Expert mentor'}
                    </p>
                </div>
            </div>

            <div className="min-w-0 flex-1">
                {wide && (
                    <div className="hidden sm:block mb-3">
                        <h3 className="text-white font-bold text-xl leading-snug">{mentor.name}</h3>
                        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-zan-cyan">
                            <RoleIcon className="w-4 h-4" aria-hidden="true" />
                            {mentor.is_student_mentor ? 'Student mentor' : 'Expert mentor'}
                        </p>
                    </div>
                )}

                {experience && (
                    <p className="inline-block mb-3 px-3 py-1 rounded-full bg-zan-cyan/10 text-sm font-semibold text-white">
                        {experience}
                    </p>
                )}

                {bio && (
                    <>
                        <p
                            ref={bioRef}
                            id={bioId}
                            className={`text-gray-400 leading-relaxed text-[15px] whitespace-pre-line ${open ? '' : 'line-clamp-4'}`}
                        >
                            {bio}
                        </p>
                        {(cut || open) && (
                            <button
                                type="button"
                                onClick={() => setOpen((v) => !v)}
                                aria-expanded={open}
                                aria-controls={bioId}
                                className="mt-2 min-h-[40px] text-sm font-semibold text-zan-cyan hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-zan-cyan rounded"
                            >
                                {open ? 'Show less' : 'Read more'}
                            </button>
                        )}
                    </>
                )}
            </div>
        </article>
    );
};

/** center: line a single mentor's card up under a centred heading. */
const MentorCards = ({ mentors, center = false }: { mentors: MentorInfo[]; center?: boolean }) => {
    if (!mentors?.length) return null;
    const single = mentors.length === 1;
    // Only as many columns as there are mentors, so two cards don't leave an empty third column.
    const layout = single
        ? 'max-w-3xl'
        : mentors.length === 2
            ? 'grid md:grid-cols-2 gap-5 max-w-4xl'
            : 'grid md:grid-cols-2 lg:grid-cols-3 gap-5';

    return (
        <div className={`${layout} ${center ? 'mx-auto' : ''}`}>
            {mentors.map((m) => (
                <MentorCard key={m.id} mentor={m} wide={single} />
            ))}
        </div>
    );
};

export default MentorCards;
