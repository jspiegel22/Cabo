import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import type { Category } from "@shared/schema";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/${category.slug}`}>
      <a className="block transition-transform hover:scale-[1.02]">
        <Card className="overflow-hidden">
          <div className="aspect-[16/9] relative">
            <img
              src={category.imageUrl}
              alt={category.name}
              className="object-cover w-full h-full"
            />
          </div>
          <CardHeader>
            <CardTitle>{category.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{category.description}</p>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
