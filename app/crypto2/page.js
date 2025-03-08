/*堀
######################################################################
File: "page.js".
On nepi40 : (*home-common="/cygdrive/g/home2/"):
(concat *home-common 
  "neon_postgres_241226/013/nextjs-blog2/app/crypto2/"
  "page.js")
By Horita.
On (2025 Mar 7).
######################################################################
This is a client-component.
*/
'use client';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
import { trcLev } from '@/app/definitions';
//import { crypto } from 'crypto-js/index.js';//Added
//
import { useRouter } from 'next/navigation';//Added
import stl from './page.module.css';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const tableName = 'comments3';//Mdf
//**********************************************************************
const CryptoJS = require('crypto-js');//OK
//**********************************************************************
export default function Page(){//<1
  console.log('-- typeof(CryptoJS)=');//Tracing
  console.dir(typeof(CryptoJS));
  const router = useRouter();//Added
  let rn1 = Math.random();
  let rn1B = rn1.toString().substring(2);
  if( trcLev >= 1 ){//<3
    console.log('rn1B=');
    console.dir(rn1B);
  }//3>
  //======================================================================
  async function encrypt1(formData){//<2
    //'use server';//This is not allowed in a client-component.
    const input1 = formData.get('input1');
    if( trcLev >= 1 ){//<3
      console.log('input1=');
      console.dir(input1);
    }//3>
    let hash1 = CryptoJS.SHA256(input1);
    let hash1B = hash1.toString();
    let input2 = rn1B + hash1B;
    let hash2 = CryptoJS.SHA256(input2);
    let hash2B = hash2.toString();
    let input3 = rn1B + '_' + hash2B;
    try{//<3
      let url3 = `/crypto2/${input3}`;
      router.push(url3);
      router.refresh();
    }//3>
    catch(err){//<3
      console.log('-- err=');
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
