import ServiceProviderCard from '@/components/service/ServiceProviderCard';
import CategoryFilter from '@/components/service/CategoryFilter';

type Provider = {
  name: string;
  photoUrl: string;
  category: string;
  rating: number;
  email: string;
  phone: string;
};

async function getServiceProviders(category: string): Promise<Provider[]> {
  const all = [
    { name: 'Kritika', category: 'Plumbing', rating: 4.8, photoUrl: '', email: '', phone: '' },
    { name: 'Nirusha', category: 'Electrician', rating: 4.6, photoUrl: '', email: '', phone: '' },
    { name: 'Jina', category: 'Cleaning', rating: 4.9, photoUrl: '', email: '', phone: '' },
  ];

  return category === 'All' ? all : all.filter(p => p.category === category);
}

interface PageProps {
  searchParams: {
    category?: string;
  };
}

export default async function ServiceProviderPage({ searchParams }: PageProps) {
  const category = searchParams.category || 'All';
  const providers = await getServiceProviders(category);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Service Providers</h1>

        <CategoryFilter selectedCategory={category} />

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {providers.map((p, i) => (
            <ServiceProviderCard key={i} provider={p} />
          ))}
          {providers.length === 0 && (
            <p className="text-center col-span-full text-gray-500">No providers found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
