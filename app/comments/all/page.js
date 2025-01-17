import Image from "next/image";
//import styles from "./page.module.css";
import { neon } from '@neondatabase/serverless';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
async function getData(){
  const sql = neon(process.env.DATABASE_URL);
  const response = await sql`SELECT * from comments`;
  //const response = await sql`SELECT * from public.comments`;
  return response;
  //return response[0].version;
}
//**********************************************************************
export default async function Page(){
  const data = await getData();
  const lgt = data.length;
  //======================================================================
  function mapper1(item, k){
    return (
      <li key={k}>
      ● {item.comment}
      </li>
    );
  }
  //======================================================================
  return (
    <>
      <p>
      ● <a href='/'>Top-Page</a>
      </p>
      <h2>Comments：</h2>
      <p>count={lgt}</p>
      <h3>Records：</h3>
      <ul>
        {data.map(mapper1)}
      </ul>
    </>
  );
}
//**********************************************************************
