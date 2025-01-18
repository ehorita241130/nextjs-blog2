import { neon } from '@neondatabase/serverless';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default async function Page(){
  //======================================================================
  async function create(formData){
    'use server';
    const DATABASE_URL="postgresql://neondb_owner:cTQfV1CaR6AL@ep-icy-water-a8x9ec5v.eastus2.azure.neon.tech/neondb?sslmode=require";
    const sql = neon(DATABASE_URL);
    //const sql = neon(process.env.DATABASE_URL);
    await sql`CREATE TABLE IF NOT EXISTS comments (comment TEXT)`;
    const comment = formData.get("comment");
    await sql("INSERT INTO comments (comment) VALUES ($1)", [comment]);
  }
  //======================================================================
  return (
      <>
        <p>
        ● <a href='/'>Top-Page</a>
        </p>
        <h2>Add Comment：</h2>
        <form action={create}>
          <input type='text' placeholder='Write a comment' name='comment' />
          <button type='submit'>Submit</button>
        </form>
      </>
  );
}
//**********************************************************************
