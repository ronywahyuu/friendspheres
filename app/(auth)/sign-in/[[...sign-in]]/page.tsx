// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//   return <SignIn />;
// }
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center border">
      <SignIn />
    </div>
  )
}
