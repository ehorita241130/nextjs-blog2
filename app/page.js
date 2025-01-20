import Image from "next/image";
import styles from "./page.module.css";
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
//**********************************************************************
const tableName = 'comments2';//Mdf
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
    <>
      <center>
      <h2>DB of Authors and Papers</h2>
      </center>
      <p>
       By using Neon with<br/>
      [{data}]
      </p>
      <hr/>
      <h3>Links for handling [{tableName}]：</h3>
      <ul>
        <li>
          ● <a href='/comments/all'>Show all comments.</a>
        </li>
        <li>
          ● <a href='/comments/add'>Add comment.</a>
        </li>
        <li>
          ● <a href='/comments/delete'>Delete comment.</a>
        </li>
      </ul>
      <h3>Links for handling [author]：</h3>
      <ul>
        <li>
          ● <a href='/ask/author/show2'>Show author by ID.</a>
        </li>
        <li>
          ● <a href='/ask/author/show3'>Show author by NAME.</a>
        </li>
      </ul>
      <h3>Links for handling [paper]：</h3>
      <ul>
        <li>
          ● <a href='/ask/paper/show1'>Show paper by ID.</a>
        </li>
        <li>
          ● <a href='/ask/paper/show2'>Show paper by TITLE.</a>
        </li>
      </ul>
      <h3>Links for handling [author-paper-relation]：</h3>
      <ul>
      <li>
      ● <a href='/ask/auth_pap_rel/show1'>Show by AUTHOR ID.</a>
      </li>
      </ul>
    </>
  );
  //======================================================================
}
//**********************************************************************
