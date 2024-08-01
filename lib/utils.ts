import { auth } from "@clerk/nextjs/server";
import { type ClassValue, clsx } from "clsx"
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// AUTH HELPER
export const getAuthToken = async () => {
  const { getToken, userId } = await auth();
  const token = await getToken();

  if (!userId) {
    return redirect('/sign-in');
  }

  return token;
};