//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "neon_postgres_241226/013/nextjs-blog2/app/comments/delete3/"
//   "page.js")
// By Horita.
// On (2025 Mar 3).
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
  async function delete2(formData){
    'use server';
    const sql = neon(DATABASE_URL);
    const id = formData.get('id');
    const sqlQuery = `delete from ${tableName} where id=$1`;
    await sql(sqlQuery, [id]);
  }
  //======================================================================
  return (
    <div className={stl.main}>
      <p className={stl.headingP}>
      ● <a href='/'>Top-Page</a>
      </p>
      <h2 className={stl.h2A}>Delete Comment from {tableName}：</h2>
      <form action={delete2} className={stl.form1}>
      <input className={stl.inp1}
          type='text' placeholder='-- Specify id --' name='id'/>
      <br/>
      <button type='submit' className={stl.btn1}>Submit</button>
      </form>
    </div>
  );
}
//**********************************************************************
