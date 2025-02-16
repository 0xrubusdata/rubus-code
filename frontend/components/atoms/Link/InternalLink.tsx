// components/atoms/links/InternalLink.tsx
import { LinkItem } from '@/components/types/atoms/LinkItem';
import { Link } from 'react-router-dom';

interface InternalLinkProps {
    link: LinkItem;
}

const InternalLink: React.FC<InternalLinkProps> = ({ link }) => (
    <Link to={link.href}>
        {link.label}
    </Link>
);

export default InternalLink;