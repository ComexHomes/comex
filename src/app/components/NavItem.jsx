import Link from "next/link";
const NavItem = ({ text, href, active }) => {
  return (
    <Link className={`nav__link`} target={href.startsWith("http") ? "_blank" : undefined} href={href}>
      {text}
    </Link>
  );
};

export default NavItem;
