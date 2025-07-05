import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold">About Me</h1>
      <p className="text-muted-foreground mt-4 text-lg">
        This is a portfolio website to showcase my photography work.
      </p>
    </div>
  );
}
