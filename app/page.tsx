import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Task } from "./api/[[...routes]]/tasks";
import { auth, clerkClient, getAuth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { APP_CONFIG } from "@/lib/config";
import axios from "axios";
import { getAuthToken } from "@/lib/utils";
import { axiosInstance } from "@/lib/axios-helper";
import { neon } from "@neondatabase/serverless";
// import { axiosInstance as axios } from "@/lib/axios-helper";

const BASE_URL = "http://localhost:3001/api/v1";

const getHello = async () => {
  const res = await axios.get(`https:/jsonplaceholder.typicode.com/posts`);
  console.log(res.data);
  return res.data;
};

const getDbData = async () => {
  const sql = neon(process.env.DATABASE_URL!)
  const res = await sql`SELECT * FROM version()`;
  console.log('db data', res);
  return res[0];
}



export default async function Home() {
  const getTasks = async () => {

    const res = await axiosInstance.get(`${BASE_URL}/tasks`, {
      params: {
        offset: 0,
        limit: 5
      }
    });


    return res.data.data;

  }

  const tasks = await getTasks();
  const dbData = await getDbData();
  console.log('tasks', tasks);

  return (
    <main>
      <p>Hello</p>
      <ul>
        {tasks?.map((task: Task) => (
          <li key={task.id}>{task.title}</li>
        ))}
        {/* {getTaskData().then((tasks) => {
          tasks.map((task: Task) => (
            <li key={task.id}>{task.title}</li>
          ));
        }}}  */}
      </ul>
      <SignedOut>
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>


    </main>
  );
}
