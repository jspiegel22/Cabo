import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { type Category, type Item } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function Category() {
  const { slug } = useParams();

  const { data: category } = useQuery<Category>({
    queryKey: [`/api/categories/${slug}`],
  });

  const { data: items, isLoading } = useQuery<Item[]>({
    queryKey: [`/api/categories/${category?.id}/items`],
    enabled: !!category?.id,
  });

  if (!category) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 pt-24">
      <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
      <p className="text-gray-600 mb-12">{category.description}</p>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[300px] bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items?.map((item) => (
            <Link key={item.id} href={`/${category.slug}/${item.slug}`}>
              <a>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/9]">
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.description}</p>
                    {item.price && (
                      <p className="mt-2 font-semibold">From {item.price}</p>
                    )}
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
