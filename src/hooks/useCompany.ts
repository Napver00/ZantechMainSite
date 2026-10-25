import { useEffect, useState } from 'react';
import { brandText } from '../utils/brand';
import { API_BASE_URL } from '../config';

export interface SocialLink { platform: string; url: string }

export interface Company {
    name: string;
    email: string;
    phone: string;
    location: string;
    hero_description?: string;
    about_description1?: string;
    about_description2?: string;
    social_links: SocialLink[];
}

export const WHATSAPP_NUMBER = '8801894634149';

// Shown until the API answers (and if it can't be reached).
const FALLBACK: Company = {
    name: 'ZAN Tech',
    email: 'zantechbd@gmail.com',
    phone: '+880 1894634149',
    location: 'House 48, Road 9/C, Sector 5, Uttara, Dhaka - 1230, Bangladesh',
    social_links: [],
};

/** Company contact details and social links managed from the admin panel. */
export const useCompany = () => {
    const [company, setCompany] = useState<Company>(FALLBACK);

    useEffect(() => {
        let cancelled = false;
        fetch(`${API_BASE_URL}/api/company`)
            .then((r) => r.json())
            .then((res) => {
                if (cancelled || !res?.success || !res.data) return;
                setCompany((prev) => ({
                    ...prev,
                    ...res.data,
                    name: 'ZAN Tech',
                    hero_description: brandText(res.data.hero_description),
                    about_description1: brandText(res.data.about_description1),
                    about_description2: brandText(res.data.about_description2),
                    social_links: (res.data.social_links || []).filter((s: SocialLink) => s?.url),
                }));
            })
            .catch(() => { /* keep the fallback */ });
        return () => { cancelled = true; };
    }, []);

    return company;
};
