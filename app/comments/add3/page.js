//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "neon_postgres_241226/013/nextjs-blog2/app/comments/add3/"
//   "page.js")
// By Horita.
// On (2025 Mar 2).
//######################################################################
// <-File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "neon_postgres_241226/013/nextjs-blog2/app/comments/add/"
//   "page.js")
// By Horita.
// On (2025 Mar 1).
// -- On 2025_3_2.
//######################################################################
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
//
import stl from './page.module.css';//Added
//**********************************************************************
const tableName = 'comments3';//Mdf
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default async function Page(){
  //======================================================================
  async function addEntry(formData){
    'use server';
    const sql = neon(DATABASE_URL);
    await sql(`CREATE TABLE IF NOT EXISTS ${tableName} (id serial, comment TEXT)`, []);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const queryStr = 
    `INSERT INTO ${tableName} (id, name, email, message) VALUES (nextval(\'comments3_id_seq\'), $1, $2, $3)`;
    await sql(queryStr, [name, email, message]);
    //await sql('INSERT INTO comments (comment) VALUES ($1)', [comment]);
  }
  //======================================================================
  return (
    <div className={stl.main}>
      <p className={stl.headingP}>
        ● <a href='/'>Top-Page</a>
      </p>
      <h2 className={stl.h2A}>Add Comment to [{tableName}]：</h2>
      <form action={addEntry} className={stl.form1}>
      Name：
      <input className={stl.inp1}
        type='text' size='50' placeholder='-- Write your name --' name='name'/>
      <br/>
      Email：
        <input className={stl.inp1}
          type='text' size='50' placeholder='-- Write your email adddress --' name='email'/>
      <br/>
      Message：<br/>
        <textarea className={stl.inp1}
          rows='5' cols='60'
          placeholder='-- Write a comment --' 
          name='message'></textarea>
        <br/>
      <button type='submit' className={stl.btn1}>Submit</button>
      </form>
    </div>
  );
  //======================================================================
}
//**********************************************************************
