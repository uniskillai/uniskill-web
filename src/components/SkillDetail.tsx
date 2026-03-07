import React from 'react';

/**
 * SkillSpec - 定义从 Markdown 解析出的标准技能数据结构
 */
export interface SkillSpec {
    name: string;
    description: string;
    parameters: Record<string, any>;
    implementation: Record<string, any>;
}

export interface SkillDetailProps {
    skill: SkillSpec;
    isOfficial: boolean;
    isOwner: boolean; // 逻辑：标识当前查看者是否是该技能的创建者
}

/**
 * SkillDetail - 统一技能详情页模板
 * 提供技能描述、参数列表展示，并对开发者敏感设置进行权限控制
 */
export const SkillDetail: React.FC<SkillDetailProps> = ({ skill, isOfficial, isOwner }) => {

    /**
     * Logic: Convert the JSON Schema parameters into a readable array for the table
     * 逻辑：将 JSON Schema 格式的参数对象转换为可遍历的数组，方便渲染表格
     */
    const parameterList = Object.keys(skill.parameters || {}).map(key => ({
        name: key,
        ...skill.parameters[key]
    }));

    return (
        <div className="skill-container max-w-4xl mx-auto p-6">

            {/* ── 1. Header Section ── */}
            <header className="flex items-center justify-between border-b pb-4 mb-6">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    {skill.name}
                    {/* 逻辑：根据技能来源动态渲染身份勋章 */}
                    {isOfficial ? (
                        <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">Official</span>
                    ) : (
                        <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded">Community</span>
                    )}
                </h1>
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                    Run in Playground
                </button>
            </header>

            {/* ── 2. Description Section ── */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed font-light">
                    {skill.description}
                </p>
            </section>

            {/* ── 3. Parameters Table Section ── */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Parameters</h2>
                {parameterList.length > 0 ? (
                    <div className="overflow-x-auto border border-gray-100 rounded-lg">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-4 py-3 font-semibold text-gray-600">Name</th>
                                    <th className="px-4 py-3 font-semibold text-gray-600">Type</th>
                                    <th className="px-4 py-3 font-semibold text-gray-600">Required</th>
                                    <th className="px-4 py-3 font-semibold text-gray-600">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-gray-600">
                                {parameterList.map((param) => (
                                    <tr key={param.name} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-4 py-3 font-mono text-blue-600">{param.name}</td>
                                        <td className="px-4 py-3 text-gray-500">{param.type}</td>
                                        {/* 逻辑：处理必填项的 UI 高亮显示 */}
                                        <td className="px-4 py-3">
                                            {param.required ? (
                                                <span className="text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded text-xs">Yes</span>
                                            ) : (
                                                <span className="text-gray-400">No</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">{param.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No parameters required for this skill.</p>
                )}
            </section>

            {/* ── 4. Implementation Security Section ── */}
            {/* 逻辑：极其重要的安全防护！底层的 endpoint 和 api_key 仅对技能的所有者可见 */}
            {isOwner && (
                <section className="mt-12 pt-6 border-t border-red-100 bg-red-50/50 p-6 rounded-xl border-dashed">
                    <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-lg font-semibold text-red-800">
                            Developer Settings (Private)
                        </h2>
                        <span className="bg-red-100 text-red-600 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">Owner Only</span>
                    </div>
                    <p className="text-sm text-red-600/80 mb-4">
                        Only visible to you. These are the underlying routing and implementation configurations.
                    </p>
                    <pre className="bg-gray-900 text-green-400 p-5 rounded-lg text-xs overflow-x-auto shadow-sm">
                        <code>
                            {JSON.stringify(skill.implementation, null, 2)}
                        </code>
                    </pre>
                </section>
            )}

        </div>
    );
};
