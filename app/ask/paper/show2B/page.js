//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "neon_postgres_241226/013/nextjs-blog2/app/ask/paper/show2B/"
//   "page.js")
// By Horita.
// On (2025 Mar 5).
//######################################################################
'use client';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
//
import { useRouter } from 'next/navigation' 
import stl from './page.module.css';//Added
//**********************************************************************
const tableName = 'paper';//Mdf
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default function Page(){
  const router = useRouter();
  //======================================================================
  async function handleSubmit(formData){
    const title = formData.get('title');
    console.log('-- title=', {title});
    try{
      let url2 = `/ask/paper/show2B/${title}`;
      router.push(url2);
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
      <h2>Show papers by (part of) TITLE：</h2>
      <form action={handleSubmit}>
        <input className={stl.inp1}
          type='text' placeholder='Specify (part of) TITILE' name='title'/><br/>
        <button type='submit' className={stl.btn1}>Submit</button>
      </form>
    </div>
  );
}
//**********************************************************************
