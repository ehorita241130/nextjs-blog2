import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
import { trcLev } from '@/app/definitions';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const tableName = 'paper';//Mdf
//const trcLev = 2;
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
  const data = await sql(query, []);
  if( trcLev >= 2 ){//For tracing.
    console.log('-- data');
    console.dir(data);
  }
  //======================================================================
  function mapper1(item, k){
    return (
      <li key={k}>
        ● #{item.id}：{item.title}<br/>
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
