'use client';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
import { trcLev } from '@/app/definitions';
//
import { useRouter } from 'next/navigation' 
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default function Page(){
  const router = useRouter();
  //======================================================================
  async function handleSubmit(formData){
    const paperid = formData.get('paperid');
    console.log(`-- paperid=${paperid}`);
    try{
      let url1 = `/ask/auth_pap_rel/show2/${paperid}`;
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
      <h3>Show author-paper-paring(s) by PAPER-ID：</h3>
      <form action={handleSubmit}>
        <input type='text' placeholder='Specify PAPER ID' name='paperid'/>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}
//**********************************************************************
