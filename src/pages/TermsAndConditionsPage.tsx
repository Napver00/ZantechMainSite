import { BadgeCheck, GraduationCap, RotateCcw, Scale } from 'lucide-react';
import LegalLayout, { P, Points, type LegalHighlight, type LegalSection } from '../components/LegalLayout';

const HIGHLIGHTS: LegalHighlight[] = [
    { icon: BadgeCheck, title: 'Prices in BDT', text: 'Orders are confirmed on availability and paid in full before dispatch.' },
    { icon: RotateCcw, title: '7-day returns', text: 'Defective or wrong items can be returned within 7 days in their original condition.' },
    { icon: GraduationCap, title: 'Respect in class', text: 'Workshops and courses follow a simple code of conduct for everyone.' },
    { icon: Scale, title: 'Bangladeshi law', text: 'These terms follow the laws of Bangladesh, with disputes heard in Dhaka.' },
];

const SECTIONS: LegalSection[] = [
    {
        id: 'welcome',
        title: 'Welcome',
        content: (
            <P>
                Welcome to ZAN Tech. These Terms and Conditions ("Terms") govern your use of the ZAN Tech website, purchase of products, and participation in
                our services, workshops, and programs ("Services"). Please read these Terms carefully. By accessing or using our Services, you agree to be
                bound by these Terms.
            </P>
        ),
    },
    {
        id: 'general-use',
        title: 'General use',
        content: (
            <P>
                You agree to use our Services only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use
                and enjoyment of, our Services by any third party.
            </P>
        ),
    },
    {
        id: 'accounts',
        title: 'Accounts',
        content: (
            <P>
                To access certain features, such as purchasing products, you may need to create an account. You are responsible for maintaining the
                confidentiality of your account password and for all activities that occur under your account. You agree to provide accurate and complete
                information when creating your account.
            </P>
        ),
    },
    {
        id: 'sale-of-products',
        title: 'Sale of products (robotics & IoT equipment)',
        content: (
            <Points
                items={[
                    ['Product descriptions', 'We strive to ensure that all product descriptions, images, and prices are accurate. However, we do not warrant that they are error-free. If a product is not as described, your sole remedy is to return it in unused condition.'],
                    ['Orders', 'All orders are subject to acceptance and availability. We reserve the right to refuse or cancel an order for any reason, including limitations on quantities available for purchase, inaccuracies in product or pricing information, or problems identified by our fraud avoidance department.'],
                    ['Payment', 'All prices are listed in Bangladeshi Taka (BDT). Payment must be made in full before dispatch of any products. We accept payments through our designated third-party payment gateways.'],
                    ['Shipping', 'We will arrange for the shipment of the products to you. Shipping schedules are estimates only and cannot be guaranteed. The risk of loss and title for all products ordered pass to you upon our delivery to the carrier.'],
                    ['Returns and refunds', 'Returns are generally accepted for defective or incorrect items within 7 days of receipt, provided they are in their original condition and packaging.'],
                ]}
            />
        ),
    },
    {
        id: 'workshops',
        title: 'Workshops and educational services',
        content: (
            <Points
                items={[
                    ['Registration', 'Our workshops are offered free of charge to students and educators as part of our mission. Registration is required and is subject to availability.'],
                    ['Code of conduct', 'All participants are expected to behave respectfully and collaboratively. We reserve the right to remove any participant who is disruptive or fails to comply with the instructions of ZAN Tech staff.'],
                    ['Photography and videography consent', 'By participating in our workshops or events, you grant ZAN Tech the perpetual, worldwide right to use your likeness, image, and voice in photographs, videos, and other media for promotional, educational, and archival purposes without compensation. If you do not wish to be photographed or recorded, you must inform a ZAN Tech representative at the start of the event.'],
                    ['Materials', 'All hardware, tools, and instructional materials provided during workshops remain the property of ZAN Tech unless otherwise specified.'],
                ]}
            />
        ),
    },
    {
        id: 'research-development',
        title: 'Research & development (R&D) services',
        content: (
            <P>
                Our custom R&D services for businesses are governed by separate, individual contracts. The terms outlined in those contracts will supersede
                these general Terms and Conditions for the scope of that specific project.
            </P>
        ),
    },
    {
        id: 'intellectual-property',
        title: 'Intellectual property',
        content: (
            <>
                <P>
                    All content included on our website, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on
                    the site, is the property of ZAN Tech or its suppliers and is protected by copyright and other laws.
                </P>
                <P>
                    You retain ownership of the intellectual property rights in the projects you create using our components or during our workshops.
                    However, by sharing your project with us or our community, you grant us a non-exclusive, royalty-free licence to feature, share, and
                    display your project (with attribution to you) for promotional and educational purposes.
                </P>
            </>
        ),
    },
    {
        id: 'limitation-of-liability',
        title: 'Limitation of liability',
        content: (
            <P>
                To the fullest extent permitted by law, ZAN Tech shall not be liable for any indirect, incidental, special, consequential, or punitive
                damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible
                losses, resulting from: (a) your use of our Services or products; (b) any unauthorised access to or use of our servers and/or any personal
                information stored therein; (c) any defects or malfunctioning of components sold. Our liability is strictly limited to the replacement or
                refund of the purchased product.
            </P>
        ),
    },
    {
        id: 'indemnification',
        title: 'Indemnification',
        content: (
            <P>
                You agree to indemnify and hold harmless ZAN Tech and its employees from and against any claims, liabilities, damages, losses, and expenses,
                including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the
                Services or your violation of these Terms.
            </P>
        ),
    },
    {
        id: 'governing-law',
        title: 'Governing law',
        content: (
            <P>
                These Terms shall be governed and construed in accordance with the laws of the People's Republic of Bangladesh, without regard to its
                conflict of law provisions. Any disputes will be resolved in the competent courts of Dhaka, Bangladesh.
            </P>
        ),
    },
    {
        id: 'changes',
        title: 'Changes to these terms',
        content: (
            <P>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant
                changes by posting the new Terms on our website.
            </P>
        ),
    },
];

const TermsAndConditionsPage = () => (
    <LegalLayout
        eyebrow="Legal · Terms"
        title="Terms & Conditions"
        intro="The rules for shopping in the ZAN Tech store, joining our workshops and courses, and working with our R&D team."
        updated="September 15, 2025"
        highlights={HIGHLIGHTS}
        sections={SECTIONS}
        related={{ to: '/privacy-policy', label: 'Privacy Policy' }}
    />
);

export default TermsAndConditionsPage;
