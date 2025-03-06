//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "neon_postgres_241226/013/nextjs-blog2/app/ask/paper/show2B/[title]/"
//   "page.js")
// By Horita.
// On (2025 Mar 5).
//######################################################################
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
import { trcLev } from '@/app/definitions';
//
import stl from './page.module.css';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const tableName = 'paper';//Mdf
//**********************************************************************
export default async function Page(context){
  //======================================================================
  const params = await context.params;//New
  const title0 = params.title;
  if( trcLev >= 2 ){//For tracing.
    console.log('-- title0=', title0);
  } 
  const title = decodeURI(title0);
  if( trcLev >= 2 ){//For tracing.
    console.log('-- title=', title);
  } 
  const sql = neon(DATABASE_URL);
  const query = `SELECT * from ${tableName} where title like \'%${title}%\'`;
  if( trcLev >= 2 ){//For tracing.
    console.log('-- query=', query);
  } 
  const papData = await sql(query, []);
  if( trcLev >= 2 ){//For tracing.
    console.log('-- papData');
    console.dir(papData);
  }
  //======================================================================
  async function mapper2(pair, k1){
    const authorid = pair.authorid;
    const authorrole = pair.authorrole;
    const author = await sql(`select * from author where id=${authorid}`,[]);
    return (
        <span key={k1} style={{marginLeft:'10px'}}>
        {JSON.stringify(author)},{authorrole}<br/>
      </span>
    );
  }
  //======================================================================
  async function mapper1(papItem, k){
    const papId = papItem.id;
    const authPapPairs =
      await sql(`select * from auth_pap_rel where paperid=${papId}`, []);
    return (
      <li key={k}>
        <span style={{fontWeight:'bold'}}>#{papId}</span>：{papItem.title}<br/>
        <span style={{fontWeight:'bold'}}>Source</span>：<br/>
        {papItem.source}<br/>
        <span style={{fontWeight:'bold'}}>Authors</span>：<br/>
        {authPapPairs.map(mapper2)}
        <hr/>
      </li>
    );
  }
  //======================================================================
  return (
    <div className={stl.main}>
      <p className={stl.headingP}>
      ● <a href='/'>Top-Page</a>
      </p>
      <h1>Records：</h1>
      <ul>
        <hr/>
        {papData.map(mapper1)}
      </ul>
    </div>
  )
}
//**********************************************************************
