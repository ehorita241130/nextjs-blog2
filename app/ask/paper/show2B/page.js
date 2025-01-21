'use client';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/app/definitions';
//
import { useRouter } from 'next/navigation' 
//**********************************************************************
const tableName = 'paper';//Mdf
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default function Page(){
  const router = useRouter();
  //======================================================================
  async function handleSubmit(formData){
    const title = formData.get('title');
    console.log('-- title=', {title});
    try{
      let url2 = `/ask/paper/show2B/${title}`;
      router.push(url2);
      router.refresh();
    }
    catch(err){
      console.log('-- err=');
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
          <input type='text' placeholder='Specify (part of) TITILE' name='title'/>
          <button type='submit'>Submit</button>
        </form>
      </>
  );
}
//**********************************************************************
