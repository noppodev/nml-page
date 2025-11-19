import React, { useState, useEffect } from 'react';
import CodeWindow from './CodeWindow';
import { Terminal } from 'lucide-react';

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('philosophy');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const sections = [
    { id: 'philosophy', title: '1. 哲学と概要' },
    { id: 'syntax', title: '2. 基本構文 (UTag)' },
    { id: 'state', title: '3. 状態管理' },
    { id: 'style', title: '4. スタイル記述' },
    { id: 'env', title: '5. 開発環境' },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-1">
              <h3 className="font-bold text-slate-900 px-3 py-2 mb-2 text-lg">目次</h3>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-nml-green/10 text-nml-green'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="prose prose-slate max-w-none prose-headings:scroll-mt-28 prose-headings:font-bold prose-h2:text-3xl prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-100 prose-code:text-nml-green prose-code:bg-nml-green/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-normal">
              
              <div id="philosophy" className="mb-16">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4">NML 完全マニュアル</h1>
                <p className="lead text-xl text-slate-600 mb-8">
                  HTML, CSS, JSの壁を取り払い、書く楽しさを取り戻すための究極の言語仕様書。
                </p>
                
                <h2 className="text-2xl text-slate-800 mt-8 mb-4">1. NMLの哲学と概要</h2>
                <p className="text-slate-600 mb-4">
                  NML (Noppo Markup Language) は、Web開発における「構造」「スタイル」「ロジック」の分離が生む複雑さを解決します。
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
                  <li><strong>単一言語の原則:</strong> すべてを統一された「ユニバーサル・タグ (UTag)」で記述。</li>
                  <li><strong>Ruby的エレガンス:</strong> インデントベースのスコープと、直感的なキーワード。</li>
                  <li><strong>ビルトイン・リアクティビティ:</strong> 仮想DOMを意識させない、言語レベルの状態管理。</li>
                </ul>
              </div>

              <div id="syntax" className="mb-16">
                <h2 className="text-2xl text-slate-800 mb-4">2. NMLの基本構文 (UTag)</h2>
                <p className="text-slate-600 mb-6">
                  NMLはインデントによって階層構造を表現します。閉じタグは不要です。
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mb-3">要素と属性</h3>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6">
                  <CodeWindow snippet={{
                    language: 'nml',
                    code: `div(id: "app") {
  // クラスはドットで指定可能
  h1.title "Hello NML"
  
  ul.list {
    li "Item 1"
    li "Item 2"
  }
}`
                  }} />
                </div>

                <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden mb-8">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">NML</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">HTML Equivalent</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    <tr>
                      <td className="px-6 py-4 font-mono text-sm text-slate-800">div(id: "app")</td>
                      <td className="px-6 py-4 font-mono text-sm text-slate-500">&lt;div id="app"&gt;&lt;/div&gt;</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-mono text-sm text-slate-800">p.text "Hi"</td>
                      <td className="px-6 py-4 font-mono text-sm text-slate-500">&lt;p class="text"&gt;Hi&lt;/p&gt;</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div id="state" className="mb-16">
                <h2 className="text-2xl text-slate-800 mb-4">3. 状態管理 (State & Binding)</h2>
                <p className="text-slate-600 mb-6">
                  <code>state</code> キーワードで宣言された変数は自動的に監視されます。
                </p>
                
                <div className="grid gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">宣言と表示</h3>
                    <CodeWindow snippet={{
                      language: 'nml',
                      code: `state count = 0
state user = "Noppo"

div {
  p "こんにちは、" user
  p "カウント: " count
}`
                    }} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">イベントハンドリング</h3>
                    <p className="text-slate-600 mb-2 text-sm">属性に <code>on:</code> をつけることでイベントを購読します。</p>
                    <CodeWindow snippet={{
                      language: 'nml',
                      code: `button(on: click { count.value += 1 }) "増やす"
button(on: click { count.value = 0 }) "リセット"`
                    }} />
                  </div>
                </div>
              </div>

              <div id="style" className="mb-16">
                <h2 className="text-2xl text-slate-800 mb-4">4. スタイル記述の統合</h2>
                <p className="text-slate-600 mb-6">
                  CSSの競合は過去のものです。<code>style</code> ブロック内の記述は、その親要素にのみスコープされます。
                  プロパティ名はスネークケース（<code>background_color</code>）を推奨します。
                </p>
                 <CodeWindow snippet={{
                    language: 'nml',
                    code: `button.primary {
  style {
    background_color: "#007bff"
    color: "white"
    padding: "12px 24px"
    border_radius: "9999px"
  }
  "Styled Button"
}`
                  }} />
              </div>

              <div id="env" className="mb-16">
                <h2 className="text-2xl text-slate-800 mb-4">5. NMLの開発環境</h2>
                <p className="text-slate-600 mb-4">
                  NMLファイル (<code>.nml</code>) はコンパイラによって標準的なHTML/JSに変換されます。
                </p>
                <div className="bg-slate-900 text-slate-200 p-4 rounded-lg font-mono text-sm flex items-center">
                  <Terminal className="w-4 h-4 mr-2 text-nml-green" />
                  $ nml-compiler compile src/App.nml
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Documentation;