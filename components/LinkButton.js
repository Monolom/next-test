import Link from "next/link";
import styles from "../styles/LinkButton.module.css";

export default function LinkButton({ text, href, active, disabled }) {
  const { green, paginationButton, noClick } = styles;
  return (
    <Link href={href}>
      <a
        className={`${paginationButton} ${active ? green : ""} ${
          disabled ? noClick : ""
        }`}
      >
        {text}
      </a>
    </Link>
  );
}
