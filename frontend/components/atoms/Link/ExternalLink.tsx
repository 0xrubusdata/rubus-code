// components/atoms/links/ExternalLink.tsx

import { LinkItem } from "@/components/types/atoms/LinkItem";

interface ExternalLinkProps {
    link: LinkItem;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ link }) => (
    <a 
        href={link.href} 
        target="_blank" 
        rel="noopener noreferrer"
    >
        {link.label}
    </a>
);

export default ExternalLink;