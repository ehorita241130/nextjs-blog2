import Image from "next/image";
//import styles from "./page.module.css";
import { neon } from '@neondatabase/serverless';
import { revalidatePath } from "next/cache";//Added on 2025_1_18.
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const dynamic='force-dynamic';//Added on 2025_1_18.
//**********************************************************************
async function getData(){
  const DATABASE_URL="postgresql://neondb_owner:cTQfV1CaR6AL@ep-icy-water-a8x9ec5v.eastus2.azure.neon.tech/neondb?sslmode=require";
  const sql = neon(DATABASE_URL);
  //const sql = neon(process.env.DATABASE_URL);
  const response = await sql(`SELECT * from comments`, []);//Added on 2025_1_18.
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
