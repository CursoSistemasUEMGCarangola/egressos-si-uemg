"use client"

import { FeedList } from "@/components/feed/feed-list"
import { Post } from "@/components/feed/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MentorCard } from "./mentor-card"
import { JobCard } from "./job-card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

interface FeedSectionProps {
    posts: Post[]
    mentors: any[]
    jobs: any[]
}

export function FeedSection({ posts, mentors, jobs }: FeedSectionProps) {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null)

    return (
        <section className="py-24 bg-white dark:bg-slate-900/50" id="comunidade">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-primary font-bold uppercase tracking-widest text-sm">Comunidade Ativa</h2>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Conexões que Transformam</h3>
                    <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full"></div>
                </div>

                <div className="space-y-16">
                    {/* Row 1: Mentors */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                <span className="bg-primary/10 text-primary p-2 rounded-lg">🎓</span>
                                Mentores Disponíveis
                            </h4>
                            <Link href="/signup" className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
                                MOSTRAR MAIS MENTORES <ArrowRight size={16} />
                            </Link>
                        </div>

                        <ScrollArea className="w-full whitespace-nowrap pb-4">
                            <div className="flex w-max space-x-4 p-1">
                                {mentors.map((mentor) => (
                                    <MentorCard
                                        key={mentor.id}
                                        full_name={mentor.full_name}
                                        role_title={mentor.professional_history?.[0]?.role_title}
                                        company_name={mentor.professional_history?.[0]?.company_name}
                                        tech_stack={mentor.professional_history?.[0]?.tech_stack}
                                    />
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>

                    {/* Row 2: Jobs */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                <span className="bg-secondary/10 text-secondary p-2 rounded-lg">💼</span>
                                Vagas Recentes
                            </h4>
                            <Link href="/signup" className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
                                MOSTRAR MAIS VAGAS <ArrowRight size={16} />
                            </Link>
                        </div>

                        <ScrollArea className="w-full whitespace-nowrap pb-4">
                            <div className="flex w-max space-x-4 p-1">
                                {jobs.map((job) => (
                                    <JobCard
                                        key={job.id}
                                        title={job.title}
                                        company={job.company}
                                        type={job.type}
                                        location={job.location}
                                        work_mode={job.work_mode}
                                    />
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>

                    {/* Row 3: Feed News */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                <span className="bg-green-500/10 text-green-600 p-2 rounded-lg">📰</span>
                                Notícias da Comunidade
                            </h4>
                            <Link href="/signup" className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
                                MOSTRAR MAIS NOTÍCIAS <ArrowRight size={16} />
                            </Link>
                        </div>

                        {/* Feed Layout */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {posts.slice(0, 3).map((post) => (
                                <div
                                    key={post.id}
                                    className="h-full cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                                    onClick={() => setSelectedPost(post)}
                                >
                                    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 h-full flex flex-col hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div>
                                                <p className="font-semibold text-sm">{post.profiles?.full_name}</p>
                                                <p className="text-xs text-slate-500">
                                                    {new Date(post.created_at).toLocaleDateString('pt-BR')}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-4 flex-grow">
                                            {post.content}
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-xs text-primary font-medium">
                                            Ler mais
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <span>{selectedPost?.profiles?.full_name}</span>
                            <span className="text-xs font-normal text-slate-500">
                                {selectedPost && new Date(selectedPost.created_at).toLocaleDateString('pt-BR')}
                            </span>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                        <div className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                            {selectedPost?.content}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}
