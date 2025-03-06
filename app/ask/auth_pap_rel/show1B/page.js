//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "neon_postgres_241226/013/nextjs-blog2/app/ask/auth_pap_rel/show1B/"
//   "page.js")
// By Horita.
// On (2025 Mar 5).
//######################################################################
'use client';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
import { trcLev } from '@/app/definitions';
//
import { useRouter } from 'next/navigation' 
import stl from './page.module.css';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default function Page(){
  const router = useRouter();
  //======================================================================
  async function handleSubmit(formData){
    const authorid = formData.get('authorid');
    console.log(`-- authorid=${authorid}`);
    try{
      let url1 = `/ask/auth_pap_rel/show1B/${authorid}`;//Mdf
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
    <div className={stl.main}>
      <p className={stl.headingP}>
      ● <a href='/'>Top-Page</a>
      </p>
      <h3>Show author-paper-paring(s) by AUTHOR-ID：</h3>
      <form action={handleSubmit}>
        <input className={stl.inp1}
          type='text' placeholder='Specify AUTHOR ID' name='authorid'/><br/>
        <button type='submit' className={stl.btn1}>Submit</button>
      </form>
    </div>
  );
}
//**********************************************************************
