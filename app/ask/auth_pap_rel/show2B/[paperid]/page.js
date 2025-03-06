//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "neon_postgres_241226/013/nextjs-blog2/app/ask/auth_pap_rel/show2B/[paperid]/"
//   "page.js")
// By Horita.
// On (2025 Mar 6).
//######################################################################
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
import { trcLev } from '@/app/definitions';
//
import stl from './page.module.css';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const tableName = 'auth_pap_rel';//Mdf
const tableName2 = 'author';//New
//const trcLev = 2;
//**********************************************************************
export default async function Page(context){
  //======================================================================
  const params = await context.params;//New
  const paperid = params.paperid;
  const sql = neon(DATABASE_URL);
  const query = `SELECT * from ${tableName} where paperid=$1`;
  const data = await sql(query, [paperid]);
  if( trcLev >= 2 ){//For tracing.
    console.log('-- data');
    console.dir(data);
  }
  //======================================================================
  async function mapper1(entry, k){
    const aId = entry.authorid;
    const role = entry.authorrole;
    const pId = entry.paperid;
    const query2 = `SELECT * from ${tableName2} where id=$1`;
    const data2 = await sql(query2, [aId]);
    if( trcLev >= 2 ){//For tracing.
      console.log('-- data2');
      console.dir(data2);
    }
    const data2B = data2.map((entry, k) => entry.name);
    return (
      <li key={k}>
        <span style={{fontWeight:'bold'}}>Id={aId}</span>：
      Role={role}, Names={JSON.stringify(data2B)}
      </li>
    );
  }
  //======================================================================
  return (
    <div className={stl.main}>
      <p className={stl.headingP}>
      ● <a href='/'>Top-Page</a>
      </p>
      <h2  className={stl.h2A}>Authors for Paper #{paperid}：</h2>
      <ul>
        {data.map(mapper1)}
      </ul>
    </div>
  )
}
//**********************************************************************
