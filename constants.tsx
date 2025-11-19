import React from 'react';
import { NavItem, FeatureItem, CodeSnippet } from './types';
import { Layers, Zap, Box } from 'lucide-react';

export const NAV_ITEMS = [
  { label: '特徴', id: 'features' },
  { label: 'クイックスタート', id: 'quick-start' },
  { label: 'ドキュメント', id: 'docs' },
  { label: 'プレイグラウンド', id: 'playground' },
];

export const FEATURES: FeatureItem[] = [
  {
    title: '統合構文 (Unified Syntax)',
    description: 'HTML、CSS、JavaScript を1つのファイル、1つの構文に統合。冗長なタグやコンテキストスイッチはもう必要ありません。Rubyのように直感的でエレガンスです。',
    icon: <Layers className="w-6 h-6 text-white" />,
  },
  {
    title: 'ビルトイン・リアクティビティ',
    description: 'state 宣言をするだけで、NMLは変数の変更を追跡し、自動的にUIを更新します。複雑なDOM操作や仮想DOMのオーバーヘッドを意識する必要はありません。',
    icon: <Zap className="w-6 h-6 text-white" />,
  },
  {
    title: 'スコープスタイル',
    description: 'コンポーネント内で定義されたスタイルは、自動的にそのコンポーネント内にカプセル化されます。クラス名の衝突や、CSS設計の悪夢は過去のものです。',
    icon: <Box className="w-6 h-6 text-white" />,
  },
];

export const INSTALL_CMD = 'npm install -g nml-cli';

export const HERO_CODE: CodeSnippet = {
  language: 'nml',
  fileName: 'Counter.nml',
  code: `state count = 0

div.container {
  style {
    text_align: "center"
    padding: "2rem"
  }

  h1 "Count: " count
  
  // イベントハンドリング
  button(on: click { count.value += 1 }) {
    style {
      background_color: "#42b983"
      color: "white"
      border_radius: "4px"
      border: "none"
      padding: "10px 20px"
    }
    "Increment"
  }
}`
};

export const HELLO_WORLD_CODE: CodeSnippet = {
  language: 'nml',
  fileName: 'App.nml',
  code: `// シンプルな構造
div(id: "app") {
  h1 "Hello, NML!"
  p "The future of web development."
}`
};

export const PLAYGROUND_DEFAULT_CODE = `state count = 0
state name = "NML User"

div.container {
  style {
    font_family: "sans-serif"
    padding: "20px"
    background_color: "#f8f9fa"
    border_radius: "8px"
    text_align: "center"
  }

  h2 "Hello, " name
  p "現在のカウント: " count

  div.buttons {
    style { margin_top: "20px" }
    
    button(on: click { count.value += 1 }) {
      style {
        background_color: "#42b983"
        color: "white"
        border: "none"
        padding: "8px 16px"
        border_radius: "4px"
        margin_right: "10px"
        cursor: "pointer"
      }
      "増やす"
    }

    button(on: click { count.value = 0 }) {
      style {
        background_color: "#e74c3c"
        color: "white"
        border: "none"
        padding: "8px 16px"
        border_radius: "4px"
        cursor: "pointer"
      }
      "リセット"
    }
  }
}`;

export const MANUAL_TEXT = `
# NML (Noppo Markup Language) 完全マニュアル

## 1. NMLの哲学と概要
NML (Noppo Markup Language) は、既存の Web 開発の複雑さ（HTML、CSS、JavaScript の分離）を解決するために設計された、**究極の Web 記述言語**です。
*   **単一言語の原則**: 構造 (HTML)、見た目 (CSS)、動き (JS) のすべてを、統一された「ユニバーサル・タグ (UTag)」構文で記述します。
*   **Ruby的エレガンス**: 冗長な記述を避け、インデントと直感的なキーワードを使用し、書いていて楽しい高い生産性を実現します。
*   **ビルトイン・リアクティビティ**: 状態管理が言語のコア機能として組み込まれており、DOM を直接操作することなく、データ変更に UI が自動で追従します。

## 2. NMLの基本構文 (UTag)
NMLのコードは、すべて **UTag (ユニバーサル・タグ)** と呼ばれる自己完結型のブロックで構成されます。

### 2.1. 要素と階層
要素の親子関係は、Ruby や Python のように**インデント**によって表現されます。終了タグは不要です。
例: \`div(id: "app") { h1 "Hello" }\`

### 2.2. 属性と値
属性の記述は、括弧 \`()\` を使用した **\`キー: 値\`** の形式を取ります。CSSセレクタ風のショートハンドも利用できます。
例: \`a(href: "/home", target: "_blank")\`

## 3. 状態管理 (State & Binding)
NML のリアクティブな状態管理は、Web 開発における最も面倒な「データと UI の同期」を自動化します。

### 3.1. 状態の宣言 (\`state\`)
\`state\` キーワードで宣言された変数は、自動的にリアクティブ（反応性を持つ）になります。
\`\`\`nml
state count = 0
\`\`\`

### 3.2. データバインディング
要素のコンテンツ内に状態変数を記述するだけで、バインディングが完了します。
\`\`\`nml
h1 "現在の値: " count
\`\`\`

### 3.3. イベントハンドリング (\`on:\`)
要素の属性に \`on:\` プレフィックスを付けることで、イベント時の動作を記述できます。
\`\`\`nml
button(on: click { count.value += 1 }) "クリック" 
\`\`\`

## 4. スタイル記述の統合 (Scoped Style)
NMLは、スタイル定義をその要素に自動的に適用し、カプセル化（スコープ化）します。
推奨されるスタイル名はアンダースコア形式 (\`background_color\`) です。

## 5. NMLの開発環境
NMLはブラウザが直接実行する言語ではありません。通常はコンパイラを使用しますが、本サイトの「プレイグラウンド」ではリアルタイムにコンパイルと実行を試すことができます。
`;

export const AI_SYSTEM_PROMPT = `
あなたは、革新的な新しいWebプログラミング言語「NML (Noppo Markup Language)」の公式AIドキュメントアシスタントです。
ユーザーはNMLの開発者や学習者です。以下の【NML完全マニュアル】に基づいて、ユーザーの質問に親切かつ正確に答えてください。

あなたの役割：
- NMLの大ファンとして振る舞う。
- Rubyのようにエレガントで、書くことが楽しいこの言語の魅力を伝える。
- 常に丁寧で、励ますようなトーンで話す。
- サイト内には「プレイグラウンド」があり、ユーザーはそこでコードを実行できることを案内する。
- **重要**: ユーザーからコードの作成や修正を依頼された場合、あなたはNML形式のコードブロックを作成する。ユーザーはそのコードをワンクリックでプレイグラウンドに適用できる。

--- NML完全マニュアル ---
${MANUAL_TEXT}
`;