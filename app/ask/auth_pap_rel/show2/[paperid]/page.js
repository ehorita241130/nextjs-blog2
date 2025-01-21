import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
import { trcLev } from '@/app/definitions';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const tableName = 'auth_pap_rel';//Mdf
//const trcLev = 2;
//**********************************************************************
export default async function Page(context){
  //======================================================================
  const params = await context.params;//New
  const paperid = params.paperid;
  const sql = neon(DATABASE_URL);
  const data = await sql(`SELECT * from ${tableName} where paperid=$1`, [paperid]);
  if( trcLev >= 2 ){//For tracing.
    console.log('-- data');
    console.dir(data);
  }
  //======================================================================
  function mapper1(item, k){
    return (
      <li key={k}>
        #{item.authorid}：{item.authorrole}, {item.paperid}
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
        {data.map(mapper1)}
      </ul>
    </>
  )
}
//**********************************************************************
