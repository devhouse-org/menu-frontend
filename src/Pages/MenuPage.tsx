import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "../axiosInstance";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CategoriesBar from "../components/Menu/CategoriesBar";

interface ItemType {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
  category?: { id: string; name: string; orderNumber?: number };
}

interface DealType {
  id: string;
  title: string;
  description: string;
  discount?: number;
  image?: string;
}

// Categories state is handled inside the extracted component

const fetchItemsPage = async (categoryId: string, pageParam: number) => {
  const response = await axios.get(
    `/item/public?page=${pageParam}&restaurantId=${localStorage.getItem(
      "RestaurantID"
    )}&categoryId=${categoryId}`
  );
  return response.data;
};

const fetchDeals = async () => {
  const response = await axios.get(
    `/deal?restaurantId=${localStorage.getItem("RestaurantID")}&published=true`
  );
  return response.data.items;
};

const MenuPage: React.FC = () => {
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  const {
    data: itemsData,
    isPending: isItemsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["items", selectedCategory],
    queryFn: ({ pageParam = 1 }) =>
      fetchItemsPage(selectedCategory!, pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    enabled: !!selectedCategory,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
  });

  const items: ItemType[] = useMemo(
    () => itemsData?.pages.flatMap((p: any) => p.items) ?? [],
    [itemsData]
  );

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, selectedCategory]);

  const { data: deals = [], isPending: isDealsLoading } = useQuery({
    queryKey: ["deals"],
    queryFn: fetchDeals,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  // Initial category is provided by CategoriesBar via onCategoryChange

  const handleCategoryClick = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  // New function to filter items based on search term
  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item: ItemType) => {
      const nameMatch = t(item.name).toLowerCase().includes(term);
      const descMatch = t(item.description || "").toLowerCase().includes(term);
      return nameMatch || descMatch;
    });
  }, [items, searchTerm, t]);



  // Category scroll and pagination are managed inside CategoriesBar

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Deals Carousel */}
      {deals.length > 0 && (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">{t("Special Deals")}</h2>
          <Carousel
            className="w-full rounded-xl"
            opts={{ loop: true, align: "center" }}
          >
            <CarouselContent>
              {deals.map((deal: DealType) => (
                <CarouselItem key={deal.id} className="basis-full">
                  <div className="relative">
                    <Card className="overflow-hidden rounded-xl shadow-sm">
                      <CardContent className="p-0">
                        {deal.image && (
                          <img
                            src={deal.image}
                            alt={t(deal.title)}
                            className="w-full h-64 md:h-72 object-cover"
                            loading="lazy"
                            decoding="async"
                            sizes="100vw"
                          />
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                          <h3 className="text-xl font-semibold mb-1">
                            {t(deal.title)}
                          </h3>
                          <p className="text-sm opacity-90">{t(deal.description)}</p>
                        </div>
                        {deal.discount && (
                          <div className="absolute top-4 right-4 bg-red-600/95 backdrop-blur text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                            {deal.discount}% OFF
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
      <div className="sticky top-0 z-20 p-4 backdrop-blur bg-background/80 border-b">
        {/* Search bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("Search items...")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full pl-9"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              inputMode="search"
            />
          </div>
        </div>

        {/* Categories handled in standalone component */}
        <CategoriesBar onCategoryChange={(id) => setSelectedCategory(id)} />
      </div>

      {/* Items grid */}
      <div className="flex-grow overflow-y-auto p-4">
        {!selectedCategory ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <Search className="h-10 w-10 mb-3 opacity-60" />
            <p className="text-sm md:text-base">{t("Please select a category to view items.")}</p>
          </div>
        ) : isItemsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Render skeletons when items are loading */}
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="shadow-sm animate-pulse">
                <CardHeader>
                  <Skeleton className="w-full aspect-video rounded-lg" />
                  <Skeleton className="h-6 w-3/4 mt-3" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardFooter>
                  <Skeleton className="h-5 w-1/4" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item: ItemType) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="relative">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={t(item.name)}
                          className="w-full aspect-video object-cover"
                          loading="lazy"
                          decoding="async"
                          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                        />
                      )}
                      <div className="absolute top-3 right-3 bg-background/90 backdrop-blur px-2.5 py-1 rounded-full text-sm font-semibold text-primary border">
                        {t("IQD")} {item.price.toLocaleString()}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-base md:text-lg font-semibold tracking-tight">
                        {t(item.name)}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                        {t(item.description || "")}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t(item.name)}</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                      {t(item.description || "")}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="p-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={t(item.name)}
                        className="w-full object-cover rounded-lg mb-4"
                        style={{ maxHeight: "60vh" }}
                        loading="lazy"
                        decoding="async"
                        sizes="100vw"
                      />
                    )}
                    <p className="text-lg font-bold text-primary mb-2">
                      {t("IQD")} {item.price.toLocaleString()}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ) : (
          // Show a message when no items match the search
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <Search className="h-10 w-10 mb-3 opacity-60" />
            <p className="text-sm md:text-base">{t("No items found matching your search.")}</p>
          </div>
        )}
        <div ref={sentinelRef} />
        {isFetchingNextPage && (
          <div className="flex items-center justify-center py-6">
            <Skeleton className="h-6 w-24" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
