//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "neon_postgres_241226/013/nextjs-blog2/app/ask/author/show2/[id]/"
//   "page.js")
// By Horita.
// On (2025 Mar 1).
//######################################################################
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
import { trcLev } from '@/app/definitions';
//
import stl from './page.module.css';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const tableName = 'author';//Mdf
//const trcLev = 2;
//**********************************************************************
export default async function Page(context){
  //======================================================================
  const params = await context.params;//New
  const id = params.id;
  const sql = neon(DATABASE_URL);
  const sqlQuery = `SELECT * from ${tableName} where id=$1`;
  const data = await sql(sqlQuery, [id]);//Added on 2025_1_18.
  if( trcLev >= 2 ){//For tracing.
    console.log('-- data');
    console.dir(data);
  }
  //======================================================================
  function mapper1(item, k){
    return (
      <li key={k}>
        <span style={{fontWeight:'bold'}}>#{item.id}</span>：{item.name}
      </li>
    );
  }
  //======================================================================
  return (
    <div className={stl.main}>
      <p className={stl.headingP}>
      ● <a href='/'>Top-Page</a>
      </p>
      <h2 className={stl.h2A}>Records：</h2>
      <ul>
        {data.map(mapper1)}
      </ul>
    </div>
  )
  //======================================================================
}
//**********************************************************************
