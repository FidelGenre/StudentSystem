import React, { useEffect, useState } from "react";
import styles from "./Student.module.css";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:8080"; 
const PREFIX = ""; 

export default function Student() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchAll = async () => {
    const res = await fetch(`${API}${PREFIX}/student/getAll`);
    if (!res.ok) throw new Error(`GET /student/getAll -> ${res.status}`);
    return res.json();
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const student = { name, address };

    try {
      setLoading(true);
      const res = await fetch(`${API}${PREFIX}/student/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
      if (!res.ok) throw new Error(`POST /student/add -> ${res.status}`);

      const data = await fetchAll();
      setStudents(data);
      setName("");
      setAddress("");
      console.log("New Student added");
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudo conectar con el backend.");
      alert("No se pudo conectar con el backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("API base:", API);
    fetchAll()
      .then(setStudents)
      .catch((err) => {
        console.error(err);
        setErrorMsg("No se pudo obtener la lista de estudiantes.");
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Add Student</h1>

        <form className={styles.form} onSubmit={handleClick}>
          <input
            type="text"
            placeholder="Student Name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Student Address"
            className={styles.input}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <button
            type="submit"
            className={styles.button}
            disabled={loading || !name.trim() || !address.trim()}
          >
            {loading ? "Enviando..." : "Submit"}
          </button>
        </form>

        {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      </div>

      <h2 className={styles.studentList}>Students</h2>
      <div className={styles.card}>
        {students.length === 0 ? (
          <p>No hay estudiantes todavía</p>
        ) : (
          students.map((student) => (
            <div key={student.id || student._id} className={styles.studentCard}>
              <b>Id:</b> {student.id ?? student._id} <br />
              <b>Name:</b> {student.name} <br />
              <b>Address:</b> {student.address}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
