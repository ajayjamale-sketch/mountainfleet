import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Newspaper, Globe, TrendingUp, Zap } from 'lucide-react';

const NewsPage: React.FC = () => {
  return (
    <PageSectionLayout
      banner={{
        title: "Logistics Intelligence",
        subtitle: "The latest news, trends, and insights from the world of global supply chain and fleet technology."
      }}
      main={{
        title: "Staying Ahead of the Curve",
        content: (
          <>
            <p>The world of logistics is changing faster than ever. From autonomous driving to sustainable fuels, we cover the topics that matter most to your business operations.</p>
            <p>Follow our journey as we expand into new markets, release cutting-edge dashboard features, and partner with the world's leading infrastructure companies.</p>
          </>
        ),
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Featured Insights",
        items: [
          { icon: Newspaper, title: "Industry Reports", desc: "Deep dives into quarterly logistics data and emerging market trends." },
          { icon: Globe, title: "Global Updates", desc: "Live updates on international shipping routes and port statuses." },
          { icon: TrendingUp, title: "Tech Trends", desc: "Expert analysis on how AI and blockchain are transforming supply chains." },
        ]
      }}
      cta={{
        title: "Never miss an update",
        subtitle: "Subscribe to our weekly digest and stay informed on the future of logistics.",
        buttonText: "Subscribe Now",
        link: "#"
      }}
    />
  );
};

export default NewsPage;
