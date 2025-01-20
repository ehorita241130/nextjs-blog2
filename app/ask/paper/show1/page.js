'use client';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
import { trcLev } from '@/app/definitions';
//
import { useRouter } from 'next/navigation' 
//**********************************************************************
const tableName = 'paper';//Mdf
//const trcLev = 2;
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default function Page(){
  const router = useRouter();
  //======================================================================
  async function handleSubmit(formData){
    const id = formData.get('id');
    console.log(`-- id=${id}`);
    try{
      let url1 = `/ask/paper/show1/${id}`;
      router.push(url1);
      router.refresh();
    }
    catch(err){
      console.log('-- err=');
      console.dir(err);
    }
  }
  //======================================================================
  return (
    <>
      <p>
      ● <a href='/'>Top-Page</a>
      </p>
      <h2>Show paper by ID：</h2>
      <form action={handleSubmit}>
        <input type='text' placeholder='Specify ID' name='id'/>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}
//**********************************************************************
