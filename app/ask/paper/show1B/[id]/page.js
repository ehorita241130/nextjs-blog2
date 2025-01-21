import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
import { trcLev } from '@/app/definitions';
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
        #{papId}：{papItem.title}<br/>
        Source：<br/>
        {papItem.source}<br/>
        Authors：<br/>
        {authPapPairs.map(mapper2)}
      </li>
    );
  }
  //======================================================================
  return (
    <>
      <p>
      ● <a href='/'>Top-Page</a>
      </p>
      <h1>Records：</h1>
      <ul>
        {papData.map(mapper1)}
      </ul>
    </>
  )
}
//**********************************************************************
