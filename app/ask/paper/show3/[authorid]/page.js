import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
import { trcLev } from '@/app/definitions';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const tableName = 'auth_pap_rel';//Mdf
//**********************************************************************
export default async function Page(context){
  //======================================================================
  const params = await context.params;//New
  const authorid = params.authorid;
  const sql = neon(DATABASE_URL);
  const authPapPairs = await sql(`SELECT * from ${tableName} where authorid=$1`, [authorid]);
  if( trcLev >= 2 ){//For tracing.
    console.log('-- authPapPairs');
    console.dir(authPapPairs);
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
  async function mapper0(authPapPair, k){
    const papId = authPapPair.paperid;
    const papData = 
      await sql(`select * from paper where id=${papId}`,[]);
    return (
      <li key={k}>
        <ul>
        {papData.map(mapper1)}
        </ul>
      </li>
    );
  }
  //======================================================================
  return (
    <>
      <p>
      ● <a href='/'>Top-Page</a>
      </p>
      <h2>Records：</h2>
      <ul>
        {authPapPairs.map(mapper0)}
      </ul>
      <p>
      ● <a href='/'>Top-Page</a>
      </p>
    </>
  )
}
//**********************************************************************
