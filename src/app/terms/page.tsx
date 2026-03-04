"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[#0a0f1e] text-slate-300 selection:bg-blue-500/30">
            <Navbar />

            {/* 顶层背景装饰 */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full" />
            </div>

            <section className="relative z-10 pt-32 pb-20 px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* 页面标题 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                            Terms of Service
                        </h1>
                        <p className="text-blue-400 font-medium">Effective Date: March 1, 2026</p>
                    </motion.div>

                    {/* 正文内容 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="glass-card p-8 md:p-12 prose prose-invert prose-blue max-w-none border-white/5"
                    >
                        <p className="text-lg leading-relaxed text-slate-300">
                            By accessing UniSkill (<a href="https://uniskill.ai" className="text-blue-400 hover:text-blue-300 transition-colors">uniskill.ai</a>) or using our &quot;Skill Layer&quot; API, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
                        </p>

                        <hr className="my-10 border-white/5" />

                        <div className="space-y-10 text-slate-300">
                            <section>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm">1</span>
                                    Description of Service
                                </h3>
                                <p>UniSkill provides a managed infrastructure (&quot;The Universal Skill Layer&quot;) that enables AI agents to execute complex tasks, including but not limited to real-time web search and automated content scraping via our gateway.</p>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm">2</span>
                                    Account Registration and Security
                                </h3>
                                <ul className="list-disc pl-6 space-y-3 marker:text-blue-500">
                                    <li><strong>Authentication</strong>: You must authenticate via GitHub OAuth to create an account.</li>
                                    <li><strong>API Key Responsibility</strong>: Upon registration or via our <code className="text-blue-300 px-1.5 py-0.5 bg-blue-500/10 rounded">setup-skills.sh</code> script, you are provided with a unique API Key (e.g., <code className="text-blue-300 px-1.5 py-0.5 bg-blue-500/10 rounded">us-xxxxxxxx</code>).</li>
                                    <li><strong>Security</strong>: You are solely responsible for maintaining the confidentiality of your key. Any activity performed using your key will be attributed to your account.</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm">3</span>
                                    Credit System and Payments
                                </h3>
                                <ul className="list-disc pl-6 space-y-3 marker:text-blue-500">
                                    <li><strong>Initial Credits</strong>: New accounts receive 500 complimentary credits for testing purposes.</li>
                                    <li><strong>Consumption</strong>: Credits are deducted based on the specific &quot;skill&quot; invoked (e.g., <code className="text-blue-300 px-1.5 py-0.5 bg-blue-500/10 rounded">uniskill_search</code> or <code className="text-blue-300 px-1.5 py-0.5 bg-blue-500/10 rounded">uniskill_scrape</code>) and the complexity of the task.</li>
                                    <li><strong>No Refunds</strong>: Credits purchased through our subscription tiers (Starter, Pro, Scale) are non-refundable and hold no cash value.</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm">4</span>
                                    Acceptable Use and Restrictions
                                </h3>
                                <p className="mb-4">You agree NOT to use UniSkill to:</p>
                                <ul className="list-disc pl-6 space-y-3 marker:text-blue-500">
                                    <li><strong>Illegal Activity</strong>: Scrape or search for content that violates any local, state, or international laws.</li>
                                    <li><strong>Abuse</strong>: Attempt to bypass our rate limits (30 RPM for Starter / 60+ RPM for higher tiers) or execute DDoS attacks against our gateway.</li>
                                    <li><strong>Reselling</strong>: Sub-license or resell access to your UniSkill API Key without explicit written consent.</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm">5</span>
                                    Disclaimer of Warranties
                                </h3>
                                <p>UniSkill is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. While we strive for high uptime (tracked via <a href="https://status.uniskill.ai" className="text-blue-400 hover:underline">status.uniskill.ai</a>), we do not guarantee that the skills will be uninterrupted or error-free. We are not responsible for the accuracy of data retrieved from third-party websites during search or scrape operations.</p>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm">6</span>
                                    Limitation of Liability
                                </h3>
                                <p className="mb-4">To the maximum extent permitted by law, UniSkill shall not be liable for any indirect, incidental, or consequential damages arising from:</p>
                                <ul className="list-disc pl-6 space-y-3 marker:text-blue-500">
                                    <li>The actions or decisions made by an AI agent using our skills.</li>
                                    <li>Temporary service outages or data loss within the Supabase or Vercel infrastructure.</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm">7</span>
                                    Termination
                                </h3>
                                <p>We reserve the right to suspend or terminate your access to the API immediately, without prior notice, if you violate any of these terms or engage in activity that threatens the stability of our Skill Layer.</p>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm">8</span>
                                    Governing Law
                                </h3>
                                <p>These terms are governed by the laws of the jurisdiction in which the UniSkill operator is based, without regard to its conflict of law provisions.</p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
