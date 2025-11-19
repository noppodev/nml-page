import React from 'react';
import { NavItem, FeatureItem, CodeSnippet } from './types';
import { Layers, Zap, Box, Terminal } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: '特徴', href: '#features' },
  { label: 'クイックスタート', href: '#quick-start' },
  { label: 'ドキュメント', href: '#' }, // Placeholder link
];

export const FEATURES: FeatureItem[] = [
  {
    title: '統合構文 (Unified Syntax)',
    description: 'HTML、CSS、JavaScript を1つのファイル、1つの構文に統合。冗長なタグやコンテキストスイッチはもう必要ありません。Rubyのように直感的でエレガントです。',
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
  code: `component Counter
  state count = 0

  style
    .btn { 
      bg: #42b983; 
      color: white; 
      padding: 0.5rem 1rem;
      radius: 4px;
    }
    .count { font-size: 2rem; }
  end

  render
    div.container
      h1.count "Count: {count}"
      
      button.btn @click={count++}
        "Increment"
      end
    end
  end
end`
};

export const HELLO_WORLD_CODE: CodeSnippet = {
  language: 'nml',
  fileName: 'App.nml',
  code: `component App
  render
    h1 "Hello, Noppo Markup Language!"
    p "The future of web development is here."
  end
end`
};