import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { type Item } from "@shared/schema";
import ImageGallery from "@/components/shared/ImageGallery";
import BookingForm from "@/components/shared/BookingForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ItemDetail() {
  const { slug } = useParams();

  const { data: item, isLoading } = useQuery<Item>({
    queryKey: [`/api/items/${slug}`],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-24">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8" />
          <div className="h-[400px] bg-gray-200 rounded mb-8" />
        </div>
      </div>
    );
  }

  if (!item) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 pt-24">
      <h1 className="text-4xl font-bold mb-2">{item.name}</h1>
      <p className="text-gray-600 mb-8">{item.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ImageGallery images={item.images || []} className="mb-8" />

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
              <CardDescription>What's included</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-gray max-w-none">
                {Object.entries(item.details || {}).map(([key, value]) => (
                  <div key={key} className="mb-4">
                    <h3 className="text-lg font-semibold capitalize">{key}</h3>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Book Now</CardTitle>
              {item.price && (
                <CardDescription>From {item.price}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <BookingForm itemId={item.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
