import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
//**********************************************************************
const tableName = 'comments2';//Mdf
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default async function Page(){
  //======================================================================
  async function create(formData){
    'use server';
    const sql = neon(DATABASE_URL);
    await sql(`CREATE TABLE IF NOT EXISTS ${tableName} (id serial, comment TEXT)`, []);
    const comment = formData.get("comment");
    await sql(`INSERT INTO ${tableName} (id, comment) VALUES (nextval(\'comments2_id_seq\'), $1)`, [comment]);
    //await sql('INSERT INTO comments (comment) VALUES ($1)', [comment]);
  }
  //======================================================================
  return (
      <>
        <p>
        ● <a href='/'>Top-Page</a>
        </p>
        <h2>Add Comment to {tableName}：</h2>
        <form action={create}>
          <input type='text' placeholder='Write a comment' name='comment' />
          <button type='submit'>Submit</button>
        </form>
      </>
  );
}
//**********************************************************************
