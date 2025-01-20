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
    //'use server';
    const id = formData.get('id');
    console.log(`-- id=${id}`);
    try{
      let url2 = `/ask/author/show2/${id}`;
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
        <h2>Show author by ID：</h2>
        <form action={handleSubmit}>
          <input type='text' placeholder='Specify ID' name='id'/>
          <button type='submit'>Submit</button>
        </form>
        <div id='data1'>
        </div>
      </>
  );
}
//**********************************************************************
