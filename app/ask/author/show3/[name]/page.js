import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
import { trcLev } from '@/app/definitions';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const tableName = 'author';//Mdf
//const trcLev = 2;
//**********************************************************************
export default async function Page(context){
  //======================================================================
  const params = await context.params;//New
  const name0 = params.name;
  if( trcLev >= 2 ){//For tracing.
    console.log('-- name0=', name0);
  } 
  const name = decodeURI(name0);
  if( trcLev >= 2 ){//For tracing.
    console.log('-- name=', name);
  } 
  const sql = neon(DATABASE_URL);
  const query = `SELECT * from ${tableName} where name like \'%${name}%\'`;
  if( trcLev >= 2 ){//For tracing.
    console.log('-- query=', query);
  } 
  const data = await sql(query, []);
  if( trcLev >= 2 ){//For tracing.
    console.log('-- data');
    console.dir(data);
  }
  //======================================================================
  function mapper1(item, k){
    return (
      <li key={k}>
        #{item.id}：{item.name}<br/>
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
