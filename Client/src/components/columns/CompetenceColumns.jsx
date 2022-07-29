import React from "react";

import styles from "./Columns.module.css";

export default (setValue) => {
  return [
    {
      Header: "No.",
      Cell: ({ row }) => row.index + 1,
    },
    {
      Header: "Nama Siswa",
      accessor: "studentName",
      Cell: ({ value }) => {
        return <p className={styles.name}>{value}</p>;
      },
    },
    {
      Header: "Edit",
      accessor: "id",
      id: "edit",
      Cell: ({ value }) => {
        return (
          <button
            onClick={() => {
              setValue("id", value);
              setValue("requestType", "patch");
            }}
            className={styles.button}
          >
            <a href="#form" className={styles.link}>
              Edit
            </a>
          </button>
        );
      },
    },
    {
      Header: "NIM",
      accessor: "studentNumber",
    },
    {
      Header: "Nama Stase",
      accessor: "stationName",
    },
    {
      Header: "Nama Penyakit",
      accessor: "diseaseName",
    },
    {
      Header: "Kompetensi Penyakit",
      accessor: "diseaseCompetence",
    },
    {
      Header: "Nama Keterampilan",
      accessor: "skillName",
    },
    {
      Header: "Kompetensi Ketrampilan",
      accessor: "skillCompetence",
    },
    {
      Header: "Initial Pasien",
      accessor: "patientInitials",
    },
    {
      Header: "Nomor Medis Pasien",
      accessor: "patientMedicalNumber",
    },
    {
      Header: "Jenis Bimbingan",
      accessor: "guidanceName",
    },
    {
      Header: "Nama Rumah Sakit",
      accessor: "hospitalName",
    },
    {
      Header: "Status Verifikasi",
      accessor: "verified",
      Cell: ({ value }) => {
        return value ? "Terverifikasi" : "Belum Terverifikasi";
      },
    },
  ];
};