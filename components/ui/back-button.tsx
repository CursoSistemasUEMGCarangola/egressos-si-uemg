"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
    const router = useRouter()

    return (
        <Button 
            variant="ghost" 
            className="gap-2 mb-6 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 -ml-2" 
            onClick={() => router.back()}
        >
            <ArrowLeft className="h-4 w-4" />
            Voltar
        </Button>
    )
}
