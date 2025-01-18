import Image from "next/image";
//import styles from "./page.module.css";
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const dynamic='force-dynamic';//Added on 2025_1_18.
//**********************************************************************
const tableName = 'comments2';//Mdf
//**********************************************************************
async function getData(){
  const sql = neon(DATABASE_URL);
  //const tableName = 'comments2';//Mdf
  //const response = await sql(`SELECT * from comments2`, []);//Added on 2025_1_18.
  const response = await sql(`SELECT * from ${tableName}`, []);//Added on 2025_1_18.
  return response;
}
//**********************************************************************
export default async function Page(){
  const data = await getData();
  const lgt = data.length;
  //======================================================================
  function mapper1(item, k){
    return (
      <li key={k}>
        #{item.id}：{item.comment}
      </li>
    );
  }
  //======================================================================
  return (
    <>
      <p>
      ● <a href='/'>Top-Page</a>
      </p>
      <h2>Comments in {tableName}：</h2>
      <p>count={lgt}</p>
      <h3>Records：</h3>
      <ul>
        {data.map(mapper1)}
      </ul>
    </>
  );
}
//**********************************************************************
