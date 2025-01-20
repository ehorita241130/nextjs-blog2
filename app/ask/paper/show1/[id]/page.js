import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
import { trcLev } from '@/app/definitions';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const tableName = 'paper';//Mdf
//const trcLev = 1;
//**********************************************************************
export default async function Page(context){
  //======================================================================
  const params = await context.params;//New
  const id = params.id;
  const sql = neon(DATABASE_URL);
  const data = await sql(`SELECT * from ${tableName} where id=$1`, [id]);//Added on 2025_1_18.
  if( trcLev >= 2 ){//For tracing.
    console.log('-- data');
    console.dir(data);
  }
  //======================================================================
  function mapper1(item, k){
    return (
      <li key={k}>
        #{item.id}：{item.title}<br/>
        {item.source}
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
        {data.map(mapper1)}
      </ul>
    </>
  )
}
//**********************************************************************
