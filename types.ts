export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface CodeSnippet {
  language: string;
  code: string;
  fileName?: string;
}