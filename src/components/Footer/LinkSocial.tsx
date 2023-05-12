interface ILinkSocialProps {
  href: string;
  title: string;
  className: string;
  children: React.ReactNode | string;
}

const LinkSocial = ({ href, title, className, children }: ILinkSocialProps) => (
  <a
    target='_blank'
    rel='noreferrer'
    href={href}
    title={title}
    className={className}
  >
    {children}
  </a>
);

export default LinkSocial;
