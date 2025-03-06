//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "neon_postgres_241226/013/nextjs-blog2/app/ask/author/show2/"
//   "page.js")
// By Horita.
// On (2025 Mar 1).
//######################################################################
'use client';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
//
import { useRouter } from 'next/navigation' 
import stl from './page.module.css';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default function Page(){
  const router = useRouter();
  //======================================================================
  async function handleSubmit(formData){
    //'use server';
    const id = formData.get('id');
    console.log(`-- id=${id}`);
    try{
      let url2 = `/ask/author/show2/${id}`;
      router.push(url2);
      router.refresh();
    }
    catch(err){
      console.log('--err');
      console.dir(err);
    }
  }
  //======================================================================
  return (
    <div className={stl.main}>
      <p className={stl.headingP}>
      ● <a href='/'>Top-Page</a>
      </p>
      <h2 className={stl.h2A}>Show author by ID：</h2>
      <form action={handleSubmit}>
        <input className={stl.inp1} 
          type='text' placeholder='Specify ID' name='id'/><br/>
        <button type='submit' className={stl.btn1}>Submit</button>
      </form>
      <div id='data1'>
      </div>
    </div>
  );
}
//**********************************************************************
