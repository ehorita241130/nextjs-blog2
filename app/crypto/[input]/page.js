/*堀
######################################################################
File: "page.js".
On nepi40 : (*home-common="/cygdrive/g/home2/"):
(concat *home-common 
  "neon_postgres_241226/013/nextjs-blog2/app/crypto_js/[input]/"
  "page.js")
By Horita.
On (2025 Mar 7).
######################################################################
This is a server component.
*/
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
import { trcLev } from '@/app/definitions';
import stl from './page.module.css';//Added
//======================================================================
import crypto from 'crypto';//OK. This is NOT crypto-js but node.js crypto.(?)
//import { crypto } from 'crypto-js';//NG
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const crypto1 = require('crypto');//OK.
const CryptoJS = require('crypto-js');//OK
//**********************************************************************
const tableName = 'author';//Mdf
//v SHA256 hash.
const hash0 = '6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090';
//v SHA-1 hash.
//const hash0 = '6367c48dd193d56ea7b0baad25b19455e529f5ee';
//const trcLev = 2;
//**********************************************************************
export default async function Page(context){//<1
  //======================================================================
  if( trcLev >= 2 ){//<2. For tracing.
    console.log('-- crypto=')
    console.dir(crypto);
    console.log('-- typeof(CryptoJS)=')
    console.log(typeof(CryptoJS));
  }//2> 
  const params = await context.params;//New
  const input0 = params.input;
  if( trcLev >= 2 ){//F<2. or tracing.
    console.log('-- input0=', input0);
  }//2>
  const input = decodeURI(input0);
  if( trcLev >= 2 ){//<2. For tracing.
    console.log('-- input=', input);
  }//2>
  let hash1A = crypto.hash('sha256', input);
  let hash1 = crypto1.hash('sha256', input);//Org sha-1.
  let hash2 = CryptoJS.SHA256(input);//Org sha-1.
  let hash2B = hash2.toString(); 
  if( trcLev >= 1 ){//<2. For tracing.
    console.log('-- hash1A='); 
    console.dir(hash1A);
    console.log('-- hash1='); 
    console.dir(hash1);
    console.log('-- hash2B='); 
    console.dir(hash2B);
  }//2>
  let message = 'NG';
  if( hash1 === hash0 ){//<2
    message = 'OK';
  }//2>
  //======================================================================
  if( message === 'OK' ){//<2
    return (
      <div className={stl.main}>
        <h1>Success Page</h1>
        <p className={stl.headingP}>
        ● <a href='/'>Top-Page</a>
        </p>
        <h2 className={stl.h2A}>Records：</h2>
        <p>
        input：{input}
        </p>
        <p>
        hash1：{hash1}
        </p>
        <p>
        hash2B：{hash2B}
        </p>
        <p>
        message：{message}
        </p>
      </div>
    )
  }//2>
  else{//<2
    return (
      <div className={stl.main}>
        <h1>Failure Page</h1>
        <p className={stl.headingP}>
        ● <a href='/'>Top-Page</a>
        </p>
        <h2 className={stl.h2A}>Records：</h2>
        <p>
        input：{input}
        </p>
        <p>
        hash1：{hash1}
        </p>
        <p>
        hash2B：{hash2B}
        </p>
        <p>
        message：{message}
        </p>
      </div>
    )
  }//2>
}//1>
//**********************************************************************
