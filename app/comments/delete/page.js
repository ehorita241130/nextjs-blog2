import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
//**********************************************************************
const tableName = 'comments2';//Mdf
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default async function Page(){
  //======================================================================
  async function delete2(formData){
    'use server';
    const sql = neon(DATABASE_URL);
    await sql(`CREATE TABLE IF NOT EXISTS ${tableName} (id serial, comment TEXT)`, []);
    const id = formData.get('id');
    await sql(`delete from ${tableName} where id=$1`, [id]);
  }
  //======================================================================
  return (
      <>
        <p>
        ● <a href='/'>Top-Page</a>
        </p>
        <h2>Delete Comment from {tableName}：</h2>
        <form action={delete2}>
          <input type='text' placeholder='Specify id' name='id'/>
          <button type='submit'>Submit</button>
        </form>
      </>
  );
}
//**********************************************************************
