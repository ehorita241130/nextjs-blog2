import Image from "next/image";
import styles from "./page.module.css";
import { neon } from '@neondatabase/serverless';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
async function getData(){
  const DATABASE_URL="postgresql://neondb_owner:cTQfV1CaR6AL@ep-icy-water-a8x9ec5v.eastus2.azure.neon.tech/neondb?sslmode=require";
  const sql = neon(DATABASE_URL);
  //const sql = neon(process.env.DATABASE_URL);
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
