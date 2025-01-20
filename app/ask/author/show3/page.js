'use client';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
//
import { useRouter } from 'next/navigation' 
//**********************************************************************
const tableName = 'author';//Mdf
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default function Page(){
  const router = useRouter();
  //======================================================================
  async function handleSubmit(formData){
    const name = formData.get('name');
    console.log(`-- name=${name}`);
    try{
      let url2 = `/ask/author/show3/${name}`;
      router.push(url2);
      router.refresh();
    }
    catch(err){
      console.log('--err');
      console.dir(err);
    }
  }
  //======================================================================
  return (
      <>
        <p>
        ● <a href='/'>Top-Page</a>
        </p>
        <h2>Show authors by NAME：</h2>
        <form action={handleSubmit}>
          <input type='text' placeholder='Specify (part of) NAME' name='name'/>
          <button type='submit'>Submit</button>
        </form>
      </>
  );
}
//**********************************************************************
