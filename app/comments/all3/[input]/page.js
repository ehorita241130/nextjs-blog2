/*堀
######################################################################
File: "page.js".
On nepi40 : (*home-common="/cygdrive/g/home2/"):
(concat *home-common 
  "neon_postgres_241226/013/nextjs-blog2/app/comments/all3/[input]/"
  "page.js")
By Horita.
On (2025 Mar 8).
######################################################################
<-File: "page.js".
On nepi40 : (*home-common="/cygdrive/g/home2/"):
(concat *home-common 
  "neon_postgres_241226/013/nextjs-blog2/app/crypto2/[input]/"
  "page.js")
By Horita.
On (2025 Mar 8). -- On 2025_3_8.
######################################################################
This is a server-component.
*/
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
import { trcLev } from '@/app/definitions';
import stl from './page.module.css';//Added
//======================================================================
import crypto from 'crypto';//OK. This is NOT crypto-js but node.js crypto.(?)
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const tableName = 'comments3';//Mdf
//v SHA256 hash.
const hash0 = '6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090';
//**********************************************************************
async function getData(){
  const sql = neon(DATABASE_URL);
  const response = await sql(`SELECT * from ${tableName}`, []);//Added on 2025_1_18.
  return response;
}
//**********************************************************************
export default async function Page(context){//<1
  //======================================================================
  if( trcLev >= 2 ){//<2. For tracing.
    console.log('-- crypto=')
    console.dir(crypto);
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
  let k = input.indexOf('_');
  let rn1B = input.substring(0, k);
  let hash2B0 = input.substring(k+1);
  let input2_ = rn1B + hash0;
  let hash2B1 = crypto.hash('sha256', input2_);
  let message = 'NG';
  //======================================================================
  if( hash2B0 === hash2B1 ){//<2
    message = 'OK';
    const data = await getData();
    const lgt = data.length;
    //======================================================================
    function mapper1(item, k){
      return (
        <li className={stl.li1} key={k}>
          <span style={{fontWeight:'bold'}}>#{item.id}</span>：<br/>
          <span style={{fontWeight:'bold'}}>Name</span>：{item.name}<br/>
          <span style={{fontWeight:'bold'}}>Email</span>：{item.email}<br/>
          <span style={{fontWeight:'bold'}}>Message</span>：
          <pre>{item.message}</pre>
        </li>
      );
    }
    //======================================================================
    return (
      <div className={stl.main}>
        <p className={stl.headingP}>
        ● <a href='/'>Top-Page</a>
        </p>
        <h2 className={stl.h2A}>Comments in [{tableName}]：</h2>
        <p className={stl.headingP2}>
        Count of messages is <span style={{color:'blue'}}>{lgt}</span>.
        </p>
        <h3>Records：</h3>
        <ul>
          {data.map(mapper1)}
        </ul>
      </div>
    );
  }//2>
  else{//<2
    return (
      <div className={stl.main}>
        <h1>Failure Page</h1>
        <p className={stl.headingP}>
        ● <a href='/'>Top-Page</a>
        </p>
        <h2 className={stl.h2A}>Result：</h2>
        <p>
        input：{input}
        </p>
        <p>
        hash2B0：{hash2B0}
        </p>
        <p>
        hash2B1：{hash2B1}
        </p>
        <p>
        Message：{message}
        </p>
      </div>
    )
  }//2>
}//1>
//**********************************************************************
