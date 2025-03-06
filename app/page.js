import Image from "next/image";
import styles from "./page.module.css";
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
//
import stl from './page.module.css';//Added
//**********************************************************************
const tableName2 = 'comments2';//Mdf
const tableName3 = 'comments3';//Mdf
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
async function getData(){
  const sql = neon(DATABASE_URL);
  const response = await sql('SELECT version()', []);
  return response[0].version;
}
//**********************************************************************
export default async function Page(){
  const data = await getData();
  //======================================================================
  return (
    <div className={stl.main}>
      <section className={stl.secHeading}>
      <h2 className={stl.h2A}>DB of Authors and Papers</h2>
      <p className={stl.headingP}>
      By using Neon with<br/>
      [{data}]
      </p>
      </section>
      <hr/>
      <h3>Links for handling [author]：</h3>
      <ul>
        <li>
          ● <a href='/ask/author/show2'>Show author by ID.</a>
        </li>
        <li>
          ● <a href='/ask/author/show3'>Show author(s) by NAME.</a>
        </li>
      </ul>
      <h3>Links for handling [paper]：</h3>
      <ul>
        <li>
          ● <a href='/ask/paper/show1B'>Show paper by ID (in details).</a>
        </li>
        <li>
          ● <a href='/ask/paper/show2B'>Show paper(s) by TITLE (in details).</a>
        </li>
      </ul>
      <h3>Links for handling [author-paper-relation]：</h3>
      <ul>
      <li>
        ● <a href='/ask/auth_pap_rel/show1B'>Show paper(s) by AUTHOR-ID (in details).</a>
      </li>
      <li>
        ● <a href='/ask/auth_pap_rel/show2B'>Show author(s) by PAPER-ID (in details).</a>
      </li>
      </ul>
      <hr/>
      <h3>Links for handling [{tableName3}]：</h3>
      <ul>
        <li>
          ● <a href='/comments/add3'>Add comment.</a>
        </li>
        <li>
          ● <a href='/comments/all3'>Show all comment(s).</a>
        </li>
        <li>
          ● <a href='/comments/delete3'>Delete comment.</a>
        </li>
      </ul>
    </div>
  );
  //======================================================================
}
//**********************************************************************
