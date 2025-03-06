//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "neon_postgres_241226/013/nextjs-blog2/app/comments/all3/"
//   "page.js")
// By Horita.
// On (2025 Mar 3).
//######################################################################
import Image from "next/image";
//import styles from "./page.module.css";
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
//
import stl from './page.module.css';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const dynamic='force-dynamic';//Added on 2025_1_18.
//**********************************************************************
const tableName = 'comments3';//Mdf
//**********************************************************************
async function getData(){
  const sql = neon(DATABASE_URL);
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
      <li className={stl.li1} key={k}>
        <span style={{fontWeight:'bold'}}>#{item.id}</span>：<br/>
        <span style={{fontWeight:'bold'}}>Name</span>：{item.name}<br/>
        <span style={{fontWeight:'bold'}}>Email</span>：{item.email}<br/>
        <span style={{fontWeight:'bold'}}>Message</span>：
        <pre>{item.message}</pre>
      </li>
    );
  }
  //======================================================================
  return (
    <div className={stl.main}>
      <p className={stl.headingP}>
      ● <a href='/'>Top-Page</a>
      </p>
      <h2 className={stl.h2A}>Comments in [{tableName}]：</h2>
      <p className={stl.headingP2}>
			Count of messages is <span style={{color:'blue'}}>{lgt}</span>.
			</p>
      <h3>Records：</h3>
      <ul>
        {data.map(mapper1)}
      </ul>
    </div>
  );
}
//**********************************************************************
