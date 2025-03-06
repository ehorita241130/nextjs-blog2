//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "neon_postgres_241226/013/nextjs-blog2/app/ask/paper/show1B/[id]/"
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
  const id = params.id;
  const sql = neon(DATABASE_URL);
  const papData = await sql(`SELECT * from ${tableName} where id=$1`, [id]);
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
        <span style={{fontWeight:'bold'}}>#{papId}</span>：
        {papItem.title}<br/>
        <span style={{fontWeight:'bold'}}>Source</span>：<br/>
        {papItem.source}<br/>
        <span style={{fontWeight:'bold'}}>Authors</span>：<br/>
        {authPapPairs.map(mapper2)}
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
        {papData.map(mapper1)}
      </ul>
    </div>
  )
}
//**********************************************************************
