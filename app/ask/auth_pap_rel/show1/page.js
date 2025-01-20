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
    const authorid = formData.get('authorid');
    console.log(`-- authorid=${authorid}`);
    try{
      let url1 = `/ask/auth_pap_rel/show1/${authorid}`;
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
      <h3>Show paper(s) by AUTHOR ID：</h3>
      <form action={handleSubmit}>
        <input type='text' placeholder='Specify AUTHOR ID' name='authorid'/>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}
//**********************************************************************
