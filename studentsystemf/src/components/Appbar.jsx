import React from "react";
import styles from "./Appbar.module.css";

export default function Appbar() {
  return (
    <header className={styles.navbar}>
      <h1 className={styles.title}>
        Student Management System
      </h1>
    </header>
  );
}
