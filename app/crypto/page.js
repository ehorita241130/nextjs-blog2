//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "neon_postgres_241226/013/nextjs-blog2/app/crypto/"
//   "page.js")
// By Horita.
// On (2025 Mar 7).
//######################################################################
'use client';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
import { trcLev } from '@/app/definitions';
//import { crypto } from 'crypto-js/index.js';//Added
//
import { useRouter } from 'next/navigation';//Added
import stl from './page.module.css';//Added
//**********************************************************************
const tableName = 'comments3';//Mdf
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default function Page(){//<1
  const router = useRouter();//Added
  let rn1 = Math.random();
  let rn1B = rn1.toString().substring(2);
  /*
  const crypto = require('crypto');
  let h1 = crypto.hash('sha-1', 'abc123');
  console.log('--h1='); 
  console.dir(h1);
  */
  //======================================================================
  async function encrypt1(formData){//<2
    //'use server';
    const input0 = formData.get('input0');
    const input1 = formData.get('input1');
    if( trcLev >= 1 ){
      console.log('inpu0=');
      console.dir(input0);
      console.log('input1=');
      console.dir(input1);
    }
    let input2 = input0+'_'+input1;
    try{//<3
      let url2 = `/crypto/${input2}`;
      router.push(url2);
      router.refresh();
    }//3>
    catch(err){//<3
      console.log('--err');
      console.dir(err);
    }//3>
  }//2>
  //======================================================================
  return (
    <div className={stl.main}>
      <p className={stl.headingP}>
      ● <a href='/'>Top-Page</a>
      </p>
      <h2 className={stl.h2A}>Delete Comment from {tableName}：</h2>
      <form action={encrypt1} className={stl.form1}>
      <input className={stl.inp1}
             type='text' name='input0' defaultValue={rn1B}/><br/>
      <input className={stl.inp1}
          type='text' placeholder='-- Specify input --' name='input1'/>
      <br/>
      <button type='submit' className={stl.btn1}>Submit</button>
      </form>
    </div>
  );
}//1>
//**********************************************************************
