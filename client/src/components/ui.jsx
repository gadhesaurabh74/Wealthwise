import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";

export function Logo() {
  return (
    <Link to="/" className="logo">
      <span className="logo-mark">
        <Wallet size={17} />
      </span>
      <span>
        spend<span className="mint">sense</span>
      </span>
    </Link>
  );
}
export function Button({ children, variant = "primary", to, ...props }) {
  const className = `button button-${variant}`;
  return to ? (
    <Link className={className} to={to}>
      {children}
    </Link>
  ) : (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
