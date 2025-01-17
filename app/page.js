import Image from "next/image";
import styles from "./page.module.css";
import { neon } from '@neondatabase/serverless';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
async function getData(){
  const sql = neon(process.env.DATABASE_URL);
  const response = await sql`SELECT version()`;
  return response[0].version;
}
//**********************************************************************
export default async function Page(){
  const data = await getData();
  return (
    <>
      <h3>PosgreSQL Version：</h3>
      <p>{data}</p>
      <h3>Links：</h3>
      <ul>
        <li>
          ● <a href='/comments/all'>Show all.</a>
        </li>
        <li>
          ● <a href='/comments/add'>Add comment.</a>
        </li>
      </ul>
    </>
  );
}
//**********************************************************************
