import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
//**********************************************************************
const tableName = 'author';//Mdf
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
async function getData(formData){
  'use server';
  const id = formData.get('id');
  const sql = neon(DATABASE_URL);
  const response = await sql(`select * from ${tableName} where id=$1`, [id]);
  console.log(JSON.stringify(response));//For tracing.
  const lgt1 = response.length;
	/*
	N: document cannot used in the server-side.
  elmData1 = document.getElementById('data1');
  elmData1.innerText = `lgt1=${lgt1}`;
	*/
}
//**********************************************************************
export default async function Page(){
  return (
      <>
        <p>
        ● <a href='/'>Top-Page</a>
        </p>
        <h2>Show author from {tableName}：</h2>
        <form action={getData}>
          <input type='text' placeholder='Specify id' name='id'/>
          <button type='submit'>Submit</button>
        </form>
        <div id='data1'>
        </div>
      </>
  );
}
//**********************************************************************
